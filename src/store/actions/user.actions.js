// import { userService } from "../../services/user.service"
// import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'

// export const REMOVE_USER = 'REMOVE_USER'
// export const ADD_USER = 'ADD_USER'
// export const UPDATE_USER = 'UPDATE_USER'
// export const SET_USER = 'SET_USER'
// export const SET_LOADING = 'SET_LOADING'

// export function getActionRemoveUser(id) {
//   return {
//     type: 'REMOVE_USER',
//     id: id,
//   }
// }

// export function getActionAddUser(user) {
//   console.log(user)
//   return {
//     type: 'ADD_USER',
//     user,
//   }
// }

// export function getActionUpdateUser(user) {
//   console.log(user)
//   return {
//     type: 'UPDATE_USER',
//     user,
//   }
// }


// export function loadUser() {
//   return async (dispatch, getState) => {
//     const user = await userService.query()
//     dispatch({ type: SET_USER, user })     
//     dispatch({ type: SET_LOADING, isLoading: false })
//   }
// }


// export function removeUser(id) {
//   return async (dispatch) => {
//     try {
//       await userService.remove(id)
//       console.log('Deleted Succesfully!')
//       showSuccessMsg('User removed')
//       dispatch(getActionRemoveUser(id))
//     } catch (err) {
//       showErrorMsg('Cannot remove user')
//       console.log('Cannot remove user', err)
//     }
//   }
// }

// export function addUser(user) {
//   return async (dispatch) => {
//     try {
//       const savedUser = await userService.save(user)
//       console.log(savedUser)
//       dispatch(getActionAddUser(savedUser))
//       showSuccessMsg('user added')
//     } catch (err) {
//       showErrorMsg('Cannot add user')
//       console.log('cannot add user', err)
//     }
//   }
// }
// export function updateUser(user) {
//   return async (dispatch) => {
//     try {
//       const savedUser = await userService.save(user)
//       console.log('Updated user', savedUser)
//       dispatch(getActionUpdateUser(savedUser))
//       showSuccessMsg('User updated')
//     } catch (err) {
//       showErrorMsg('Cannot update user')
//       console.log('Cannot update user', err)
//     }
//   }
// }

