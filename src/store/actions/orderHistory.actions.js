import { orderHistoryService } from "../../services/orderHistory.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../../services/event-bus.service.js'

// Action Creators
export function getActionRemoveItem(id) {
    return { type: 'REMOVE_FROM_ORDERHISTORY', id }
}

export function getActionAddItem(item) {
    console.log('getActionAddItem', item)
    return {
        type: 'ADD_TO_ORDERHISTORY',
        item,
    }
}

// export function getActionUpdateItem(item, quantity) {
//     console.log('getActionUpdateItem')
//     console.log(item)
//     return {
//         type: 'UPDATE_ITEM_IN_ORDERHISTORY',
//         item,
//         quantity,
//     }
// }

export function loadOrderHistory() {
    return async (dispatch) => {
        const items = await orderHistoryService.query()
            .then(items => {
                dispatch({ type: 'SET_ORDERHISTORY', items })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

export function addItem(item) {
    console.log('addOrderHistory(item):', item)
    return async (dispatch) => {
        try {
            // console.log(item)
            const savedOrderHistory = await orderHistoryService.save(item)
            // console.log(savedOrderHistory)
            dispatch(getActionAddItem(savedOrderHistory))
            showSuccessMsg('Added to orderHistory!')
        } catch (err) {
            showErrorMsg('Cannot add item')
            // console.log('Cannot add item', err)
        }
    }
}

// export function updateItem(item) {
//     return async (dispatch) => {
//         try {
//             console.log(item)
//             const saveditem = await orderHistoryService.save(item)
//             console.log('updated orderHistory:', saveditem)
//             dispatch(getActionUpdateItem(saveditem))
//             showSuccessMsg('OrderHistory updated')
//         } catch (error) {
//             showUserMsg('cant update orderHistory')
//             console.log('cannot update orderHistory', error)
//         }
//     }
// }

export function removeItem(id) {
    console.log(id)
    return (dispatch, getState) => {
        orderHistoryService.remove(id)
            .then(() => {
                dispatch({ type: 'REMOVE_FROM_ORDERHISTORY', id })
            })
            .catch(err => {
                console.log('err:', err)
            })
    }
}

