import { useEffect } from "react";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usersService } from "../services/users.service";
import { UserList } from "../cmps/user-list";


export function SiteManagement() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [assignedSites, setAssignedSites] = useState(null);
  const [assignedAgents, setAssignedAgents] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUser = await usersService.getById(id);
        setUser(fetchedUser);
        fetchedUser.id.slice(0, 2) === 'fa'
          ? setAssignedSites(fetchedUser.assigned_sites)
          : setAssignedAgents(fetchedUser.assigned_agents);
      } catch (error) {
        console.log('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, [id]);

  if (user && (assignedSites || assignedAgents)) {
    return (
      <>
        <div className="site-management-container">
          <h1>Hi {user.name}</h1>
          {assignedAgents ? (
            <UserList AssignedIds={assignedAgents} title="Agent" />
          ) : (
            <UserList AssignedIds={assignedSites} title="Site" />
          )}
          <button onClick={() => console.log('adding to cart from site management')}>Add To Cart</button>

        </div>


      </>
    );
  }

  return (
    <>
      <h1>Loading</h1>
    </>
  );
}
