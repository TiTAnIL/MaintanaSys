import { usersService } from '../../services/users.service.js';

export const SET_USERS = 'SET_USERS'
export const SET_LOADING = 'SET_LOADING'

export const setUsers = (users) => {
    return {
      type: SET_USERS,
      users,
    }
  }
  
  export const setLoading = (isLoading) => {
    return {
      type: SET_LOADING,
      isLoading,
    }
  }
  

export function loadUsers() {
  return async (dispatch, getState) => {
    // const { filterBy } = getState().userModule
    // const users = await usersService.query(filterBy)
    const users = await usersService.query()
    dispatch({ type: SET_USERS, users })     
    dispatch({ type: SET_LOADING, isLoading: false })
  }
}
