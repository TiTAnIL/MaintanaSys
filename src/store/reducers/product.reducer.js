
const INITIAL_STATE = {
    products: [],
    filterBy: {},
    isLoading: true
}


export function productReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            }

        case 'ADD_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.product]
            }

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.productId)
            }

        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product => product.id === action.product.id ? action.product : product)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
            break
        default:
            return state;
    }
}