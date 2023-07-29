const INITIAL_STATE = {
    filterBy: {},
    user: {
        id: null,
        name: null,
        email: null,
        phone: null,
        token: null,
        assignedSites: [],
        assignedAgents: [],
        password: null,
        role: null
    },
    isLoading: true
}

export function userReducer(state = INITIAL_STATE, action) {

  switch (action.type) {
      case 'SET_USER':
          return {
              ...state,
              user: action.user
          }

      case 'ADD_USER':
          return {
              ...state,
              user: [...state.user, action.user]
          }

      case 'REMOVE_USER':
          return {
              ...state,
              user: state.user.filter(user => user.id !== action.id)
          }

      case 'UPDATE_USER':
          return {
              ...state,
              user: state.user.map(user => user.id === action.user.id ? action.user : user)
          }

      // case 'SET_FILTER_BY':
      //     return {
      //         ...state,
      //         filterBy: { ...action.filterBy }
          // }
          
      case 'SET_USER_LOADING':
          return {
              ...state,
              isLoading: action.isLoading
          }
      default:
          return state;
  }
}

