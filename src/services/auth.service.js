import { store } from '../store/index';
import { loginFailure, loginSuccess, logoutRequest } from "../store/actions/auth.actions.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { loadUsers } from '../store/actions/user.actions';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import { userService } from './user.service';
// import { userService } from './user.service';

const STORAGE_KEY = 'auth'

const userChannel = new BroadcastChannel('userChannel');

(() => {
    userChannel.addEventListener('message', (ev) => {
        store.dispatch(ev.data);
    });
})();

export const authService = {
    // login,
    performLogin,
    logout,
    getByToken
};

// async function login(credentials) {
//     console.log('login')
//     try {
//         let user
//         // var users = await userService.query()
//         // console.log(users)
//         // if (!users || !users.length) {
//         console.log('Logging in...')
//         user = performLogin(credentials)
//         console.log('user', user)
//         // }

//         // Simulate successful login
//         showSuccessMsg('Logged in successfully!')
//         return user
//     } catch (error) {
//         store.dispatch(loginFailure(error.message))
//         showErrorMsg('Failed to log in')
//         console.log('Failed to log in:', error)
//     }
// }


// async function performLogin(credentials) {
//     console.log('performLogin');
//     const matchedUser = checkCredentials(credentials);
//     return matchedUser.then((user) => {
//         if (user === null) {
//             store.dispatch(loginFailure());
//             console.log('FAILED');
//             showErrorMsg('Failed to log in');
//             return null;
//         } else {
//             const { token } = user;
//             console.log('id', user.id)
//             console.log('token', token)
//             store.dispatch(loginSuccess(token));
//             showSuccessMsg('Logged in successfully!');
//             console.log('user', user.id);
//             return user.id; // Return the user object with the updated token
//         }
//     });
// }   


async function performLogin(credentials) {
    try {
      console.log('performLogin');
      const matchedUser = await checkCredentials(credentials); // Await the checkCredentials function call
      if (matchedUser === null) {
        store.dispatch(loginFailure());
        showErrorMsg('Failed to log in');
        return null;
      } else {
        const { token } = matchedUser;
        console.log('id', matchedUser.id);
        console.log('token', token);
        store.dispatch(loginSuccess(token));
        showSuccessMsg('Logged in successfully!');
        console.log('user', matchedUser.id);
        return matchedUser.id; // Return the user object with the updated token
      }
    } catch (error) {
      store.dispatch(loginFailure(error.message));
      showErrorMsg('Failed to log in');
      return null;
    }
  }
  
  


// async function checkCredentials(credentials) {
//     const users = await userService.query();
//     if (!users || !users.length) {
//         loadUsers();
//     }   
//     const { email, password } = credentials;
//     for (const user of Object.values(users)) {
//         if (user.email === email && user.password === password) {
//             const { password, ...userWithoutPass } = user; // Exclude the 'pass' property from the user object
//             console.log(userWithoutPass, 'user matched check credentials');
//             userWithoutPass.isAuthenticated = true;
//             userWithoutPass.token = utilService.makeId(20);
//             // userService.post(userWithoutPass.token);
//             // save(userWithoutPass);
//             console.log(userWithoutPass)
//             return userWithoutPass;
//         }
//     }
//     return null; // Credentials not found
// }

export async function checkCredentials(credentials) {
    const users = await userService.query();
    if (!users || !users.length) {
      loadUsers();
    }
    const { email, password } = credentials;
    for (const user of Object.values(users)) {
      if (user.email === email && user.password === password) {
        const { password, ...userWithoutPass } = user; // Exclude the 'password' property from the user object
        userWithoutPass.isAuthenticated = true;
        userWithoutPass.token = utilService.makeId(20);
        return userWithoutPass;
      }
    }
    return null; // Credentials not found
  }


function logout() {
    // storageService.set(STORAGE_KEY, null);
    store.dispatch(logoutRequest());
    userChannel.postMessage(logout());
    showSuccessMsg('Logged out successfully!');
}

function getByToken(token) {
    return storageService.get(STORAGE_KEY, token)
}