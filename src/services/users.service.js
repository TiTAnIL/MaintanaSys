import { storageService } from "./async-storage.service.js";
import { store } from '../store/index';
import { updateUser } from "../store/actions/user.actions.js";
import { utilService } from "./util.service.js";

const STORAGE_KEY = 'users';
const userChannel = new BroadcastChannel('userChannel');

;(() => {
  userChannel.addEventListener('message', (ev) => {
    store.dispatch(ev.data);
  });
})();


export const usersService = {
  query,
  getById,
  save,
  remove
};

async function insertDemoData() {
  try {
    console.log('inserting demo data');
    const jsonData = require('./users.json');
    const demoData = jsonData.users;
    storageService.postMany(STORAGE_KEY, demoData);
  } catch (error) {
    console.error('Failed to insert demo data:', error);
  }
}

window.cs = usersService;

async function query() {
  var fetchedUsers = await storageService.query(STORAGE_KEY);
  if (!fetchedUsers || !fetchedUsers.length) {
    insertDemoData();
  }
  return fetchedUsers;
}

async function save(user) {
    var savedUser
    if (user.id) {
      savedUser = await storageService.put(STORAGE_KEY, user)
      userChannel.postMessage(updateUser(savedUser))
    } else {
      user.id = utilService.makeId()
      savedUser = await storageService.post(STORAGE_KEY, user)
    //   userChannel.postMessage(addUser(savedUser))
    }
    return savedUser
  }

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId);
}

async function remove(userId) {
  await storageService.remove(STORAGE_KEY, userId);
//   userChannel.postMessage(removeUser());
}
