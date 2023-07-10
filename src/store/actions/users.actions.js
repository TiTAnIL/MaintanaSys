import { userService } from "../../services/user.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function getActionRemoveUser(userId) {
  return {
    type: 'REMOVE_USER',
    userId: userId,
  }
}

export function getActionAddUser(user) {
  console.log(user)
  return {
    type: 'ADD_USER',
    user,
  }
}

export function getActionUpdateUser(user) {
  console.log(user)
  return {
    type: 'UPDATE_USER',
    user,
  }
}

export function loadUsers() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().userModule
    const users = await userService.query()
    dispatch({ type: 'SET_USERS', users })     
    dispatch({ type: 'SET_USERS_LOADING', isLoading: false })
  }
}

export function setFilterBy(  ) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      showSuccessMsg('User removed')
      dispatch(getActionRemoveUser(userId))
    } catch (err) {
      showErrorMsg('Cannot remove user')
      console.log('Cannot remove user', err)
    }
  }
}

export function addUser(user) {
  return async (dispatch) => {
    try {
      const savedUser = await userService.save(user)
      console.log('user added', savedUser)
      dispatch(getActionAddUser(savedUser))
      showSuccessMsg('user added')
    } catch (err) {
      showErrorMsg('Cannot add user')
      console.log('cannot add user', err)
    }
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    try {
      const savedUser = await userService.save(user)
      console.log('Updated user', savedUser)
      dispatch(getActionUpdateUser(savedUser))
      showSuccessMsg('User updated')
    } catch (err) {
      showErrorMsg('Cannot update user')
      console.log('Cannot update user', err)
    }
  }
}

