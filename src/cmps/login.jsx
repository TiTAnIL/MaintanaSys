import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/actions/auth.actions';

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isAuthenticated = useSelector((state) => state.authModule.isAuthenticated)
  const { isLoading } = useSelector(state => state.usersModule)
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/shop')
      }
    }, [isAuthenticated, navigate])


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== '' && username !== '') {
      
      const credentials = {
        username: username,
        password: password
      }
      dispatch(login(credentials))
    }
  };

// if (isLoading) return <h1>isLoading</h1>
  
  return (
    <div className="login-window">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

