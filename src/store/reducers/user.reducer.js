const initialState = {
  userId: null,
  type: null,
  userName: null,
  pass: null,
  isAuthenticated: false,
  assignedSites: []
};


const UPDATE_USER_TYPE = 'UPDATE_USER_TYPE';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
const UPDATE_ASSIGNED_SITES = 'UPDATE_ASSIGNED_SITES';
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        type: action.payload.type,
        userName: action.payload.userName,
        pass: action.payload.pass,
        isAuthenticated: true,
        assignedSites: action.payload.assignedSites
      };
    case CLEAR_USER:
      return {
        ...state,
        userId: null,
        type: null,
        userName: null,
        pass: null,
        isAuthenticated: false,
        assignedSites: []
      };
    case UPDATE_USER_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case UPDATE_USER_NAME:
      return {
        ...state,
        userName: action.payload
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        pass: action.payload
      };
    // case UPDATE_ASSIGNED_SITES:
    //   return {
    //     ..0.state,
    //     assignedSites: action.payload
    //   };
    default:
      return state;
  }
}
