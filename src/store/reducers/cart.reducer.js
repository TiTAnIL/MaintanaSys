const INITIAL_STATE = {
    items: [],
    isLoading: false,
};

export function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                items: action.items,
            };
        case 'ADD_TO_CART':
            const existingItem = state.items.find((item) => item.id === action.item.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.item.id ? { ...item, quantity: item.quantity + action.item.quantity } : item
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.item],
                };
            }
        case 'UPDATE_ITEM_IN_CART':
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.id ? { ...item, quantity: action.quantity } : item
                ),
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.id),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
}
