import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/actions/auth.actions';
import { userService } from '../services/user.service';

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const userAuth = useSelector((state) => state.authModule);

  useEffect(() => {
    if (userAuth.id) {
      console.log('userauth.id', userAuth.id)
      navigate(`/user/${userAuth.id}`);
    }
  }, [navigate, userAuth]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loadUser = useCallback((id) => {
    userService.getById(id).then((user) => {
      setUser(user);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== '' && email !== '') {
      const credentials = {
        email: email,
        password: password,
      };
      dispatch(login(credentials))
        .then((user) => {
          loadUser(user);
        })
        .catch((error) => {
          console.log('Login failed:', error);
        });
    }
  };

  return (
    <div className="login-window">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
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

