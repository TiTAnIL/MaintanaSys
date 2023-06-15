const initialState = {
  // userId: null,
  // type: null,
  // userName: null,
  pass: null,
  isAuthenticated: false,
  assignedSites: []
};



export function userReducer(state = initialState, action) {

  switch (action.type) {
      case 'SET_USERS':
          return {
              ...state,
              users: action.users
          }

      case 'ADD_USER':
          return {
              ...state,
              users: [...state.users, action.user]
          }

      case 'REMOVE_USER':
          return {
              ...state,
              users: state.users.filter(user => user.id !== action.userId)
          }

      case 'UPDATE_USER':
          return {
              ...state,
              users: state.users.map(user => user.id === action.user.id ? action.user : user)
          }
      case 'SET_LOADING':
          return {
              ...state,
              isLoading: action.isLoading
          }
      default:
          return state;
  }
}