// import { userService } from '../services/user.service.js';
import { authService } from '../../services/auth.service.js';
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';

export const  loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

export const loginSuccess = (id) => {
  console.log('id', id)
  return {
    type: LOGIN_SUCCESS,
    id
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
    type: SET_AUTH_LOADING,
    isLoading
  };
};

// export const login = (credentials) => {
//   console.log('aut login')
//   return async (dispatch) => {
//     dispatch(loginRequest());
//     try {
//       // Call your authentication service or API to perform login
//       await authService.login(credentials)
//       // showSuccessMsg('Logged in successfully!');
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//       showErrorMsg('Failed to log in');
//       console.log('Failed to log in', error);
//     }
//   };
// };


export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const userId = await authService.performLogin(credentials);
      dispatch(loginSuccess(userId));
    } catch (error) {
      dispatch(loginFailure(error.message));
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