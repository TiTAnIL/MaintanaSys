import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSites } from '../store/actions/site.actions';
import { usersService } from '../services/users.service';
import { siteService } from '../services/site.service';
import { ProductList } from './product-list';

export function UserList({ AssignedIds, title }) {
  const { sites, isLoading } = useSelector((state) => state.siteModule);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState('');
  const [loadedNames, setLoadedNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (title === 'Site') {
        const fetchedSites = await Promise.all(
          AssignedIds.map(async (id) => {
            const site = await siteService.getById(id);
            return site.name
          })
        );
        setLoadedNames(fetchedSites);
      } else if (title === 'Agent') {
        const fetchedAgents = await Promise.all(
          AssignedIds.map(async (id) => {
            const user = await usersService.getById(id);
            return user.name
          })
        );
        setLoadedNames(fetchedAgents);
      }
      dispatch({ type: 'SET_USERS_LOADING', isLoading: false }); // Update the loading state
      dispatch({ type: 'SET_SITE_LOADING', isLoading: false }); // Update the loading state
    };

    fetchData();
  }, [dispatch, AssignedIds, title]);

  function handleSiteChange(event) {
    setSelectedId(event.target.value);
    console.log('Selected Id:', event.target.value);
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
          {loadedNames.map((name, index) => (
            <option key={index} value={AssignedIds[index]}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {selectedId ? <ProductList selectedId={selectedId} /> : null}
    </section>
  );
}
