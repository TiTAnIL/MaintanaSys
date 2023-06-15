// import { userService } from '../services/user.service.js';
import { authService } from '../../services/auth.service.js';
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_LOADING = 'SET_LOADING';

export const  loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

export const logoutRequest = () => {
    return {
      type: LOGOUT
    };
  };  

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    isLoading
  };
};

export const login = (credentials) => {
  console.log('aut login')
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      // Call your authentication service or API to perform login
      await authService.login(credentials)
      // dispatch(loginSuccess());
      // showSuccessMsg('Logged in successfully!');
    } catch (error) {
      dispatch(loginFailure(error.message));
      showErrorMsg('Failed to log in');
      console.log('Failed to log in', error);
    }
  };
};

export const logout = () => {
    return async (dispatch) => {
      try {
        // Call your authentication service or API to perform logout
        // For example: await authService.logout();
        // ...
        dispatch(logoutRequest());
        showSuccessMsg('Logged out successfully!');
      } catch (error) {
        showErrorMsg('Failed to log out');
        console.log('Failed to log out', error);
      }
    };
  };