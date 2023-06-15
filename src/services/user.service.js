import { storageService } from "./async-storage.service.js"
import { store } from '../store/index'
import { updateUser } from "../store/actions/user.actions.js";
import { loadUsers } from "../store/actions/users.actions.js";


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
  save
}

window.cs = userService

function insertUser(credentials) {
  const user = getByCredentials(credentials)
}

async function query(users, credentials) {
  try {
    let user = await storageService.query(STORAGE_KEY); // Fetch the users from storage
    if (!user || !user.length || credentials) {
      users = await storageService.get(users)
      console.log(users)
      await insertUser(users, credentials); // Insert the new user into the storage
      users = await storageService.query(users); // Fetch the updated users from storage
    }
    return user; // Return the users
  } catch (error) {
    console.error('Failed to query users:', error);
    throw error;
  }
}


async function save(user) {
  var savedUser
  if (user.id) {
    savedUser = await storageService.put(STORAGE_KEY, user)
    userChannel.postMessage(updateUser(savedUser))
  }
  return savedUser
}


function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function getByCredentials(credentials) {
  console.log('getbycrede', credentials)
  return storageService.get(STORAGE_KEY, credentials.username)
}
