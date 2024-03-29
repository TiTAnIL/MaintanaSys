import { useEffect } from "react";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from "../services/user.service";
import { UserList } from "../cmps/user-list";


// component to check if the user is an agent or a site manager and display the relevant info


export function SiteManagement() {
    const [user, setUser] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUser = await userService.getById(id)
                setUser(fetchedUser)
            } catch (error) {
                console.log('failed to fetch user info:', error)
            }
        }
        fetchUserInfo()
    }, [id])


    if (user) {
        return (
            <div className="site-management">
                <h1>Hello {user.name}</h1>
                <UserList user={user} />
            </div>
        )
    }
    return <div>Loading...</div>
}