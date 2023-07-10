import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSites } from '../store/actions/site.actions';

export function UserList({ AssignedIds, title }) {
    const { sites, isLoading } = useSelector((state) => state.siteModule);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (title === "Site") {
                dispatch(loadSites(AssignedIds));
            } else if (title === "Agent") {
                // const fetchedAgents = await usersService.getById(AssignedIds);
                // dispatch(loadAgents(fetchedAgents));
                console.log(fetchedAgents)
            }
            dispatch({ type: 'SET_USERS_LOADING', isLoading: false }); // Update the loading state
        };

        fetchData();
    }, [dispatch, AssignedIds]);

    function handleSiteChange(event) {
        setSelectedId(event.target.value);
        console.log(event.target.value);
        console.log(typeof selectedId);
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <section className="user-cards">
            <div className="card-layout">
                <h2>Choose {title}</h2>
                <select value={selectedId} onChange={handleSiteChange}>
                    <option value="">Select a {title}</option>
                    {AssignedIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}
