import { useEffect, useState } from "react";
import { usersService } from "../services/users.service";
import { siteService } from "../services/site.service";
import { ProductList } from "./product-list";

export function UserList({ user }) {

  const [assignedIds, setAssignedIds] = useState([])
  const [assignedSites, setAssignedSites] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)
  const [assignedAgents, setAssignedAgents] = useState(null)

  useEffect(() => {
    if (user.role === 'manager') {
      setAssignedIds(user.assigned_agents)
    } else {
      setAssignedIds(user.assigned_sites)
    }
  }, [user.role, user.assignedAgents, user.assignedSites])

  useEffect(() => {
  }, [assignedAgents])

  useEffect(() => {
  }, [assignedSites])

  useEffect(() => {
    if (selectedUser) {
      const fetchAssignedSites = async () => {
        try {
          const fetchedAssignedSites = await Promise.all(selectedUser.assigned_sites.map(id => siteService.getById(id)))
          setAssignedSites(fetchedAssignedSites)
        } catch (error) {
          console.log('failed to fetch assigned sites:', error)
        }
      }
      fetchAssignedSites()
    }
  }, [selectedUser])

  useEffect(() => {
    const fetchAssignedIds = async () => {
      try {
        const fetchedAssignedIds = await usersService.getById(user.id)
        setAssignedIds(fetchedAssignedIds)
      } catch (error) {
        console.log('failed to fetch assigned ids:', error)
      }
    }
    fetchAssignedIds()
  }, [user.id])

  useEffect(() => {
    const fetchAssignedInfo = async () => {
      try {
        if (user.role === 'manager') {
          const fetchedAssignedAgents = await Promise.all(user.assigned_agents.map(id => usersService.getById(id)))
          setAssignedAgents(fetchedAssignedAgents)
        } else {
          const fetchedAssignedSites = await Promise.all(user.assigned_sites.map(id => siteService.getById(id)))
          setAssignedSites(fetchedAssignedSites)
        }
      } catch (error) {
        console.log('failed to fetch assigned info:', error)
      }
    }
    fetchAssignedInfo()
  }, [assignedIds, user.role])

  const handleSelectChange = (event) => {
    if (user.role === 'manager') {
      setSelectedUser(assignedAgents.find(agent => agent.id === event.target.value))
    } else {
      setSelectedSite(assignedSites.find(site => site.id === event.target.value))
    }
  }

  const handleSiteChange = (event) => {
    setSelectedSite(assignedSites.find(site => site.id === event.target.value))
  }

  {
    if (!user) return (
      <h1>Loading...</h1>
    )
  }

  {
    return (
      <div className="user-list">
        <div className="user-list-container">
        <div className="selects-container">
          {/* <h2>{user.role === 'manager' ? 'Select Agent' : 'Select User'}</h2> */}
          <div className="select-container">
            <option value="select">Select</option>
            <select onChange={(event) => { handleSelectChange(event); }}>
              <option value="select">Select {user.role === 'manager' ? 'agent' : 'site'}</option>
              {user.role === 'manager' && assignedAgents && assignedAgents.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}

              {user.role === 'agent' && assignedSites && assignedSites.map(site => <option key={site.id} value={site.id}>{site.name}</option>)}
            </select>
            {user.role === 'manager' && selectedUser && <h2>Selected: {selectedUser.name}</h2>}
          </div>
          <div className="select-container">
            {user.role === 'manager' && selectedUser && (
              <select onChange={(event) => { handleSiteChange(event) }}>
                <option value="select">Select Site</option>
                {assignedSites.map(site => <option key={site.id} value={site.id}>{site.name}
                </option>)}
              </select>

            )}
            {user.role === 'agent' ? selectedSite && <h2>Selected: {selectedSite.name}</h2> : selectedSite && selectedUser && <h2>Selected: {selectedSite.name}</h2>}
          </div >
        </div >

        {user.role === 'agent' && selectedSite && <ProductList site={selectedUser} />}
        {user.role === 'manager' && selectedUser && selectedSite && <ProductList user={selectedUser} site={selectedSite} />}
      </div>
      </div >

    );
  }
}
