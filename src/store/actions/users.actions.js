import { usersService } from '../../services/users.service.js';

export const SET_USERS = 'SET_USERS'
export const SET_LOADING = 'SET_LOADING'

export const UPDATE_USER_TYPE = 'UPDATE_USER_TYPE';
export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const UPDATE_ASSIGNED_SITES = 'UPDATE_ASSIGNED_SITES';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';


  
  export const setLoading = (isLoading) => {
    return {
      type: SET_LOADING,
      isLoading,
    }
  }
  

export function loadUsers() {
  return async (dispatch, getState) => {
    const users = await usersService.query()
    dispatch({ type: SET_USERS, users })     
    dispatch({ type: SET_LOADING, isLoading: false })
  }
}

export const updateUserType = (userId, userType) => {
    return {
      type: UPDATE_USER_TYPE,
      payload: {
        userId,
        userType
      }
    };
  };
  
  export const updateUserName = (userId, userName) => {
    return {
      type: UPDATE_USER_NAME,
      payload: {
        userId,
        userName
      }
    };
  };
  
  export const updateUserPassword = (userId, password) => {
    return {
      type: UPDATE_USER_PASSWORD,
      payload: {
        userId,
        password
      }
    };
  };
  
  export const updateAssignedSites = (userId, assignedSites) => {
    return {
      type: UPDATE_ASSIGNED_SITES,
      payload: {
        userId,
        assignedSites
      }
    };
  };
  
  export const setUser = (user) => {
    return {
      type: SET_USER,
      payload: user
    };
  };
  
  export const clearUser = () => {
    return {
      type: CLEAR_USER
    };
  };