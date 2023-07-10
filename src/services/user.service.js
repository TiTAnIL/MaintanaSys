import { storageService } from "./async-storage.service.js"
import { store } from '../store/index'
import { getActionAddUser, getActionUpdateUser, updateUser } from "../store/actions/user.actions.js";
// import { utilService } from "./util.service.js";


const STORAGE_KEY = 'user'
const userChannel = new BroadcastChannel('userChannel')
  ; (() => {
    userChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
  })()

export const userService = {
  query,
  getById,
  save,
  getByToken
}

window.cs = userService

// function insertUser(credentials) {
//   const user = getById(credentials)
// }

async function query(credentials) {
  console.log('query call')
  // call for the logged user by token
  try {
    // let user = checkCredentials(credentials)
    let user = await storageService.query(STORAGE_KEY); // Fetch the users from storage
    // if (!user || !user.length || credentials) {
      // user = await storageService.get(user)
      // console.log(user)
      // console.log('dsfjhsdjkfjsdlkfjdsaklfjadsklfjdsklfsdjfklsdfjlsdfjsdklfjsdklf')
      // await insertUser(user, credentials); // Insert the new user into the storage
      // user = await storageService.query(user); // Fetch the updated users from storage
    // }
    return user; // Return the user
  } catch (error) {
    console.error('Failed to query user:', error);
    throw error;
  }
}


async function save(user) {
  var savedUser
  if (user.token) {
    savedUser = await storageService.put(STORAGE_KEY, user)
    userChannel.postMessage(getActionUpdateUser(savedUser))
  } else {
    // TODO: owner is set by the beckend
    // user.owner = userService.getLoggedinUser()
    savedUser = await storageService.post(STORAGE_KEY, user)
    userChannel.postMessage(getActionAddUser(savedUser))
  }
  return savedUser
}


function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function getByToken(token) {
  console.log('getbytoken', token)
  return storageService.get(STORAGE_KEY, token)
}
