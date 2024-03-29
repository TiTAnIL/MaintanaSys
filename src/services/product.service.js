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


export const productService = {
  query,
  getById,
  save,
  remove,
  getEmptyProduct
}

window.cs = productService

async function insertDemoData() {
  try {
    const jsonData = require('./db/products.json');
    const demoData = jsonData.products;
    storageService.postMany(STORAGE_KEY, demoData);
  } catch (error) {
    console.error('Failed to insert demo data:', error);
  }
}

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
  if (product.id) {
    savedProduct = await storageService.put(STORAGE_KEY, product)
    productChannel.postMessage(getActionUpdateProduct(savedProduct))
  } else {
    product.id = utilService.makeId()
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
    "supplier": "",
    "quantity": 0
  }
}
