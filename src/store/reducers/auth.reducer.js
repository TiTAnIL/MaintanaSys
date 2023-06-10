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
