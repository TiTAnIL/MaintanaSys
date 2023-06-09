import { userService } from "../../services/user.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

export const REMOVE_USER = 'REMOVE_USER'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_LOADING = 'SET_LOADING'

export const removeUser = (userId) => {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      console.log('User removed successfully!')
      showSuccessMsg('User removed')
      dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
      showErrorMsg('Cannot remove user')
      console.log('Cannot remove user', err)
    }
  }
}

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const savedUser = await userService.save(user)
      console.log(savedUser)
      dispatch({ type: ADD_USER, user: savedUser })
      showSuccessMsg('User added')
    } catch (err) {
      showErrorMsg('Cannot add user')
      console.log('Cannot add user', err)
    }
  }
}

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const savedUser = await userService.save(user)
      console.log('Updated user', savedUser)
      dispatch({ type: UPDATE_USER, user: savedUser })
      showSuccessMsg('User updated')
    } catch (err) {
      showErrorMsg('Cannot update user')
      console.log('Cannot update user', err)
    }
  }
}

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
