import { cartService } from "../../services/cart.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveitem(id) {
    return { type: 'REMOVE_FROM_CART', id }
}

export function getActionAdditem(item) {
    console.log('getActionAdditem', item)
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

export function addItem(item) {
    console.log('addCart(item):', item)
    return async (dispatch) => {
        try {
            // console.log(item)
            const savedCart = await cartService.save(item)
            // console.log(savedCart)
            dispatch(getActionAdditem(savedCart))
            showSuccessMsg('Added to cart!')
        } catch (err) {
            showErrorMsg('Cannot add item')
            // console.log('Cannot add item', err)
        }
    }
}

export function updateItem(item) {
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

export function removeItem(id) {
    console.log(id)
    return (dispatch, getState) => {
        cartService.remove(id)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_CART', id })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

