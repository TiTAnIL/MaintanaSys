const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null
  };
  
  const LOGIN_REQUEST = 'LOGIN_REQUEST';
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGIN_FAILURE = 'LOGIN_FAILURE';
  const LOGOUT = 'LOGOUT';
  
  export function authReducer(state = initialState, action) {
    console.log('reducer call', action)
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          error: null
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          error: action.payload
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          error: null
        };
      default:
        return state;
    }
  };
  


  // export function plantReducer(state = INITIAL_STATE, action) {
  //   switch (action.type) {
  //     case 'SET_LOGGED_IN_USER':
  //       return {
  //         ...state,
  //         loggedInUser: action.user
  //       };
  
  //     case 'CLEAR_LOGGED_IN_USER':
  //       return {
  //         ...state,
  //         loggedInUser: null
  //       };
  
  //     case 'SET_LOADING':
  //       return {
  //         ...state,
  //         isLoading: action.isLoading
  //       };
  
      // Other existing cases for managing plants can remain as they are
  
  //     default:
  //       return state;
  //   }
  // }
  