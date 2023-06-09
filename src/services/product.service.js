import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'
import { getActionAddProduct, getActionRemoveProduct, getActionUpdateProduct } from "../store/actions/product.actions.js";


const STORAGE_KEY = 'fetchedProducts'
const productChannel = new BroadcastChannel('productChannel')

  ; (() => {
    productChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
  })()

async function insertDemoData() {
  const response = await fetch('./products.json')
  const data = await response.json()
  const demoData = data.fetchedProducts
  storageService.postMany(STORAGE_KEY, demoData)
}

export const productService = {
  query,
  getById,
  save,
  remove,
  getEmptyProduct,
}

window.cs = productService

async function query(filterBy) {
  var fetchedProducts = await storageService.query(STORAGE_KEY)
  if (!fetchedProducts || !fetchedProducts.length) {
    insertDemoData()
  }
  if (filterBy) {
    const {name,  priceRange, watering, lightning, difficulty, locations } = filterBy
    if (name) {
      const regex = new RegExp(name, 'i')
      fetchedProducts = fetchedProducts.filter((product) => regex.test(product.name))
    }
    
    if (priceRange) {
      fetchedProducts = fetchedProducts.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)
    }
    if (watering) {
      fetchedProducts = fetchedProducts.filter((product) => product.watering === watering)
    }
    if (lightning) {
      fetchedProducts = fetchedProducts.filter((product) => product.lightning === lightning)
    }
    if (difficulty) {
      fetchedProducts = fetchedProducts.filter((product) => product.difficulty === difficulty)
    }
    if (locations) {
      const selectedLocations = Object.keys(locations).filter(location => locations[location])
      if (selectedLocations.length > 0) {
        fetchedProducts = fetchedProducts.filter((product) => selectedLocations.includes(product.location))
      }
    }
  }
  return fetchedProducts
}


async function save(product) {
  var savedProduct
  if (product._id) {
    savedProduct = await storageService.put(STORAGE_KEY, product)
    productChannel.postMessage(getActionUpdateProduct(savedProduct))
  } else {
    // TODO: owner is set by the beckend
    // product.owner = userService.getLoggedinUser()
    product._id = utilService.makeId()
    savedProduct = await storageService.post(STORAGE_KEY, product)
    productChannel.postMessage(getActionAddProduct(savedProduct))
  }
  return savedProduct
}

function getById(productId) {
  return storageService.get(STORAGE_KEY, productId)
}

async function remove(productId) {
  await storageService.remove(STORAGE_KEY, productId)
  productChannel.postMessage(getActionRemoveProduct())
}

function getEmptyProduct() {
  return {
    "roduct_name": "",
    "price": 0,
    "supplier": ""
  }
}
