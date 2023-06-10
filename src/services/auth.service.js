    import { store } from '../store/index';
    import { loginRequest, loginSuccess, loginFailure, logoutRequest } from "../store/actions/auth.actions.js";
    import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

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
        store.dispatch(loginRequest());
        console.log('Logging in...');

        // Perform login logic, e.g., send login request to server and handle response
        // Here, you can use your authentication service or API to verify the user's credentials
        // For example:
        const user = await performLogin(credentials);

        // Simulate successful login
        store.dispatch(loginSuccess(user));
        userChannel.postMessage(loginSuccess(user));

        showSuccessMsg('Logged in successfully!');
    } catch (error) {
        store.dispatch(loginFailure(error.message));
        showErrorMsg('Failed to log in');
        console.log('Failed to log in:', error);
    }
    }

        async function performLogin(credentials) {
        // Use your authentication service or API to verify the user's credentials
        // For example:
        console.log('perfoming login', credentials)
        const response = await fetch('login-url', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            throw new Error('Failed to authenticate');
        }
        }

    function logout() {
    store.dispatch(logoutRequest());
    userChannel.postMessage(logout());

    showSuccessMsg('Logged out successfully!');
    }
