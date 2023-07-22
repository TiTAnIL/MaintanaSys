
// when the user is manager - the AssignedIds array will contain the agents ids
// when the user is an agent - the AssignedIds array will contain the sites ids
// the user cant be both an agent and a site manager
// if the user is an manager we will get dropdow with the agents assigned to him
// when the user choose an agent from the dropdown we will display the sites assigned to the agent
// if the user is an agent we will display the sites assigned to him in the dropdown
// when assigned sites are chosen we will display load <ProductList />

import { useEffect, useState } from "react";
import { usersService } from "../services/users.service";
import { siteService } from "../services/site.service";
import { ProductList } from "./product-list";

export function UserList({ user }) {

  const [assignedIds, setAssignedIds] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const [assignedSites, setAssignedSites] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)

  useEffect(() => {
    if (user.privileges === 'agent') {
      setAssignedIds(user.assigned_sites)
      console.log('assignedIds:', assignedIds)
    } else if (user.privileges === 'manager') {
      setAssignedIds(user.assigned_agents)
      console.log('assignedIds:', assignedIds)
    }
  }, [user])

  useEffect(() => {
    // if the user is an agent we will call siteService.getById for each site id in assignedIds
    // if the user is a manager we will call usersService.getById for each user id in assignedIds
    // if user is a manager when he selects assigned agent from the dropdown we will use getById to get the agent info and set the assignedSites state to the agent assigned sites

    if (user.privileges === 'agent') {
      const fetchAssignedSites = async () => {
        try {
          const fetchedSites = await Promise.all(assignedIds.map(async (siteId) => {
            const fetchedSite = await siteService.getById(siteId)
            return fetchedSite
          }))
          setAssignedSites(fetchedSites)
        } catch (error) {
          console.log('failed to fetch assigned sites:', error)
        }
      }
      fetchAssignedSites()
    } else if (user.privileges === 'manager') {
      const fetchAssignedUsers = async () => {
        try {
          const fetchedUsers = await Promise.all(assignedIds.map(async (userId) => {
            const fetchedUser = await usersService.getById(userId)
            return fetchedUser
          }))
          setAssignedUsers(fetchedUsers)
        } catch (error) {
          console.log('failed to fetch assigned users:', error)
        }
      }
      fetchAssignedUsers()
    }
  }, [assignedIds, user])
  

  // after the user selects a value from the dropdown we will display the ProductList component if the user is an agent
  // or we will open another dropdown that will display the sites assigned to the selected agent
 
  const handleSelectChange = (event) => {
    console.log('event.target.value:', event.target.value)
    if (user.privileges === 'agent') {
      console.log('event.target.value:', event.target.value)
      setSelectedSite(event.target.value)
    } else if (user.privileges === 'manager') {
      console.log('event.target.value:', event.target.value)
      setSelectedUser(event.target.value)

    }
  }



  if (user) {
    return (
      <div className="user-list">
        <h2>{user.privileges}</h2>
        <p>user: {user.name}</p>
        <p>user id: {user.id}</p>
        <p>user role: {user.privileges}</p>
        <h3>Assigned:</h3>

        {user.privileges === 'agent' && <select onChange={handleSelectChange}>
          <option value="">Select Site</option>
          {assignedSites.map((site) => {
            return <option key={site.id} value={site.id}>{site.name}</option>
          })}
        </select>}
        {user.privileges === 'manager' && <select onChange={handleSelectChange}>
          <option value="">Select Agent</option>
          {assignedUsers.map((user) => {
            return <option key={user.id} value={user.id}>{user.name}</option>
          })}
        </select>}
        
      </div>
    )
  }

  return (
    <h1>Loading...</h1>
  )
}