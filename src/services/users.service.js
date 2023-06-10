import { storageService } from "./async-storage.service.js";
import { store } from '../store/index';
import { updateUser } from "../store/actions/user.actions.js";

const STORAGE_KEY = 'users';
const userChannel = new BroadcastChannel('userChannel');

;(() => {
  userChannel.addEventListener('message', (ev) => {
    store.dispatch(ev.data);
  });
})();

async function insertDemoData() {
  const response = await fetch('./users.json');
  const data = await response.json();
  const demoData = data.fatchedUsers;
  storageService.postMany(STORAGE_KEY, demoData);
}

export const userService = {
  query,
  getById,
  save,
  remove
};

window.cs = userService;

async function query() {
  var fetchedUsers = await storageService.query(STORAGE_KEY);
  if (!fetchedUsers || !fetchedUsers.length) {
    insertDemoData();
  }
  return fetchedUsers;
}

async function save(user) {
    var savedUser
    if (user._id) {
      savedUser = await storageService.put(STORAGE_KEY, user)
      userChannel.postMessage(updateUser(savedUser))
    } else {
      user._id = utilService.makeId()
      savedUser = await storageService.post(STORAGE_KEY, user)
      userChannel.postMessage(addUser(savedUser))
    }
    return savedUser
  }

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId);
}

async function remove(userId) {
  await storageService.remove(STORAGE_KEY, userId);
  userChannel.postMessage(removeUser());
}
