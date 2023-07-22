import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'


import {
    getActionRemoveitem,
    getActionAdditem,
    getActionUpdateitem,
} from '../store/actions/cart.actions.js'

const STORAGE_KEY = 'cart'
const cartChannel = new BroadcastChannel('cartChannel')

    // import axios from "axios"

    ; (() => {
        cartChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()


export const cartService = {
    query,
    getById,
    save,
    remove,
}
window.cs = cartService

async function query() {
    return storageService.query(STORAGE_KEY)
}

async function remove(id) {
    await storageService.remove(STORAGE_KEY, id)
    cartChannel.postMessage(getActionRemoveitem(id))
}

async function save(item) {
    var savedCart
    // if (item._id) {
    // savedCart = await storageService.put(STORAGE_KEY, item)
    // cartChannel.postMessage(getActionUpdateitem(savedCart))
    // } else {
    // TODO: owner is set by the beckend
    // plant.owner = userService.getLoggedinUser()
    savedCart = await storageService.post(STORAGE_KEY, item)
    cartChannel.postMessage(getActionAdditem(savedCart))
    // }
    return savedCart
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

