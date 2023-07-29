import { orderService } from "../../services/order.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveItem(id) {
    return { type: 'REMOVE_FROM_ORDER', id }
}

export function getActionAddItem(item) {
    console.log('getActionAddItem', item)
    return {
        type: 'ADD_TO_ORDER',
        item,
    }
}

export function getActionUpdateItem(item, quantity) {
    console.log('getActionUpdateItem')
    console.log(item)
    return {
        type: 'UPDATE_ITEM_IN_ORDER',
        item,
        quantity,
    }
}

export function loadOrder() {
    return async (dispatch) => {
        const items = await orderService.query()
            .then(items => {
                dispatch({ type: 'SET_ORDER', items })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

export function addItem(item) {
    console.log('addOrder(item):', item)
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(item)
            dispatch(getActionAddItem(savedOrder))
            showSuccessMsg('Added to order!')
        } catch (err) {
            showErrorMsg('Cannot add item')
        }
    }
}

export function updateItem(item) {
    return async (dispatch) => {
        try {
            console.log(item)
            const saveditem = await orderService.save(item)
            console.log('updated order:', saveditem)
            dispatch(getActionUpdateItem(saveditem))
            showSuccessMsg('Order updated')
        } catch (error) {
            showUserMsg('cant update order')
            console.log('cannot update order', error)
        }
    }
}

export function removeItem(id) {
    console.log(id)
    return (dispatch, getState) => {
        orderService.remove(id)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_ORDER', id })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

