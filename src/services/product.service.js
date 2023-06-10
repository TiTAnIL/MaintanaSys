import { storageService } from "./async-storage.service.js"
import { utilService } from './util.service.js'
import { store } from '../store/index'
import { getActionAddProduct, getActionRemoveProduct, getActionUpdateProduct } from "../store/actions/product.actions.js";


const STORAGE_KEY = 'products'
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
  getEmptyProduct
}

window.cs = productService

async function query(filterBy) {
  var fetchedProducts = await storageService.query(STORAGE_KEY);
  if (!fetchedProducts || !fetchedProducts.length) {
    insertDemoData()
  }
  if (filterBy) {
    const { name, supplier } = filterBy;
    if (name) {
      const regex = new RegExp(name, 'i')
      fetchedProducts = fetchedProducts.filter((product) =>
        regex.test(product.product_name)
      )
    }
    if (supplier) {
      const regex = new RegExp(supplier, 'i')
      fetchedProducts = fetchedProducts.filter((product) =>
        regex.test(product.supplier)
      )
    }
  }
  return fetchedProducts;
}


async function save(product) {
  var savedProduct
  if (product._id) {
    savedProduct = await storageService.put(STORAGE_KEY, product)
    productChannel.postMessage(getActionUpdateProduct(savedProduct))
  } else {
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
    "product_name": "",
    "price": 0,
    "supplier": ""
  }
}
