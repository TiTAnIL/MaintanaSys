import { cartService } from "../../services/cart.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveitem(itemId) {
    return { type: 'REMOVE_FROM_CART', itemId }
}

export function getActionAdditem(item) {
    console.log('getActionAdditem')
    return {
        type: 'ADD_TO_CART',
        item,
    }
}

export function getActionUpdateitem(item, quantity) {
    console.log('getActionUpdateitem')
    console.log(item)
    return {
        type: 'UPDATE_ITEM_IN_CART',
        item,
        quantity,
    }
}

export function loadCart() {
    return async (dispatch) => {
        const items = await cartService.query()
            .then(items => {
                dispatch({ type: 'SET_CART', items })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

export function additem(item) {
    console.log('addCart(item):', item)
    return async (dispatch) => {
        try {
            console.log(item)
            const savedCart = await cartService.save(item)
            console.log(savedCart)
            dispatch(getActionAdditem(savedCart))
            showSuccessMsg('Added to cart!')
        } catch (err) {
            showErrorMsg('Cannot add item')
            console.log('Cannot add item', err)
        }
    }
}

export function updateitem(item) {
    return async (dispatch) => {
        try {
            console.log(item)
            const saveditem = await cartService.save(item)
            console.log('updated cart:', saveditem)
            dispatch(getActionUpdateitem(saveditem))
            showSuccessMsg('Cart updated')
        } catch (error) {
            showUserMsg('cant update cart')
            console.log('cannot update cart', error)
        }
    }
}

export function removeitem(itemId) {
    console.log(itemId)
    return (dispatch, getState) => {
        cartService.remove(itemId)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_CART', itemId })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

