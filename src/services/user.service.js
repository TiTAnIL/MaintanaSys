import { storageService } from "./async-storage.service.js"
import { store } from '../store/index'
import { updateUser } from "../store/actions/user.actions.js";


const STORAGE_KEY = 'users'
const userChannel = new BroadcastChannel('userChannel')
  ; (() => {
    userChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
  })()

export const userService = {
  getById,
  save
}

window.cs = userService

async function save(user) {
  var savedUser
  if (user._id) {
    savedUser = await storageService.put(STORAGE_KEY, user)
    userChannel.postMessage(updateUser(savedUser))
  }
  return savedUser
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}
