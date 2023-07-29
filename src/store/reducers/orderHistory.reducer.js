
const INITIAL_STATE = {
    orderHistory: [],
    filterBy: {},
    isLoading: true
}


export function historyReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_HISTORIES':
            return {
                ...state,
                histories: action.histories
            }

        case 'ADD_HISTORY':
            return {
                ...state,
                histories: [...state.histories, action.history]
            }

        case 'REMOVE_HISTORY':
            return {
                ...state,
                histories: state.histories.filter(history => history.id !== action.historyId)
            }

        case 'UPDATE_HISTORY':
            return {
                ...state,
                histories: state.histories.map(history => history.id === action.history.id ? action.history : history)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_HISTORY_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            break
        default:
            return state;
    }
}