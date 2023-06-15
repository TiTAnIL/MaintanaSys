import { store } from '../store/index';
import { loginFailure, loginSuccess, logoutRequest } from "../store/actions/auth.actions.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { loadUsers } from '../store/actions/users.actions';
import { storageService } from './async-storage.service';
import { usersService } from './users.service';

const STORAGE_KEY = 'user'

const userChannel = new BroadcastChannel('userChannel');

(() => {
    userChannel.addEventListener('message', (ev) => {
        store.dispatch(ev.data);
    });
})();

export const authService = {
    login,
    logout
};

async function login(credentials) {
    try {

        var user = usersService.query()
        console.log(user)
        if (!user || !user.length) {
            console.log('Logging in...');
            user = performLogin(credentials)
            console.log(user)
        }

        // Simulate successful login
        showSuccessMsg('Logged in successfully!');
        return user
    } catch (error) {
        store.dispatch(loginFailure(error.message));
        showErrorMsg('Failed to log in');
        console.log('Failed to log in:', error);
    }
}


async function performLogin(credentials) {
    // authentication service or API to verify the user's credentials
console.log('perfromlogin')
    const matchedUser = checkCredentials(credentials);
    if (matchedUser) {
        console.log('User matched:', matchedUser);
        return matchedUser
    } else {
        console.log('Credentials not found');
    }
    // const user = users.find((u) => u.username === username && u.password === password)
    console.log(matchedUser)
    
    // const response = await fetch('login-url', {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: {
            //         'Content-Type': 'application/json'
            //     }
    // });
    // if (response.ok) {
        //     const data = await response.json();
        //     return data.user;
        // } else {
            //     throw new Error('Failed to authenticate');
            // }
            
        }
        
        async function checkCredentials(credentials) {
            loadUsers()
            const { username, password } = credentials
            const users = await storageService.query(STORAGE_KEY)
            console.log(username, password)
            for (const user of Object.values(users)) {
                console.log(user.userName, user.pass)
                console.log(user)
                if (user.userName === username && user.pass === password) {
                    store.dispatch(loginSuccess())
                    user.isAuthenticated = true;
                    getToken()
                    return user;
                }
            }
            return null; // Credentials not found
        }

        function getToken() {
        }

        function logout() {
            store.dispatch(logoutRequest());
            userChannel.postMessage(logout());
            
            showSuccessMsg('Logged out successfully!');
        }
        