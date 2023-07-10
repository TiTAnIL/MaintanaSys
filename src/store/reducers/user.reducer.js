// const initialState = {
//     id: null,
//     name: null,
//     email: null,
//     phone: null,
//     roleId: null,
//     password: null,
//     token: null,
//     assignedSites: []
// }


// export function userReducer(state = initialState, action) {

//     switch (action.type) {
//         case 'SET_USER':
//             return {
//                 ...state,
//                 user: action.user
//             }

//         case 'ADD_USER':
//             return {
//                 ...state,
//                 user: [...state.user, action.user]
//             }

//         case 'REMOVE_USER':
//             return {
//                 ...state,
//                 user: state.user.filter(user => user.id !== action.id)
//             }

//         case 'UPDATE_USER':
//             return {
//                 ...state,
//                 user: state.user.map(user => user.id === action.user.id ? action.user : user)
//             }
//         case 'SET_LOADING':
//             return {
//                 ...state,
//                 isLoading: action.isLoading
//             }
//         default:
//             return state;
//     }
// }