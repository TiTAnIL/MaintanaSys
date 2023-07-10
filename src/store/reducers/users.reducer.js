
const INITIAL_STATE = {
  users: [],
  filterBy: {},
  isLoading: true
}


export function usersReducer(state = INITIAL_STATE, action) {

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
              users: state.users.filter(user => user.id !== action.id)
          }

      case 'UPDATE_USER':
          return {
              ...state,
              users: state.users.map(user => user.id === action.user.id ? action.user : user)
          }

      // case 'SET_FILTER_BY':
      //     return {
      //         ...state,
      //         filterBy: { ...action.filterBy }
          // }
      case 'SET_USERS_LOADING':
          return {
              ...state,
              isLoading: action.isLoading
          }
          break
      default:
          return state;
  }
}