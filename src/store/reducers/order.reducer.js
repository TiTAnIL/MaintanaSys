
const INITIAL_STATE = {
    orders: [],
    filterBy: {},
    isLoading: true
}


export function orderReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.orders
            }

        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.order]
            }

        case 'REMOVE_ORDER':
            return {
                ...state,
                orders: state.orders.filter(order => order.id !== action.orderId)
            }

        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map(order => order.id === action.order.id ? action.order : order)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_ORDER_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            break
        default:
            return state;
    }
}