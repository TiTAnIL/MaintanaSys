import { productService } from "../../services/product.service"
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function getActionRemoveProduct(productId) {
  return {
    type: 'REMOVE_PRODUCT',
    productId: productId,
  }
}

export function getActionAddProduct(product) {
  console.log(product)
  return {
    type: 'ADD_PRODUCT',
    product,
  }
}

export function getActionUpdateProduct(product) {
  console.log(product)
  return {
    type: 'UPDATE_PRODUCT',
    product,
  }
}

export function loadProducts() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().productModule
    const products = await productService.query(filterBy)
    dispatch({ type: 'SET_PRODUCTS', products })     
    dispatch({ type: 'SET_LOADING', isLoading: false })
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}

export function removeProduct(productId) {
  return async (dispatch) => {
    try {
      await productService.remove(productId)
      console.log('Deleted Succesfully!')
      showSuccessMsg('Product removed')
      dispatch(getActionRemoveProduct(productId))
    } catch (err) {
      showErrorMsg('Cannot remove product')
      console.log('Cannot remove product', err)
    }
  }
}

export function addProduct(product) {
  return async (dispatch) => {
    try {
      const savedProduct = await productService.save(product)
      console.log(savedProduct)
      dispatch(getActionAddProduct(savedProduct))
      showSuccessMsg('product added')
    } catch (err) {
      showErrorMsg('Cannot add product')
      console.log('cannot add product', err)
    }
  }
}

export function updateProduct(product) {
  return async (dispatch) => {
    try {
      const savedProduct = await productService.save(product)
      console.log('Updated product', savedProduct)
      dispatch(getActionUpdateProduct(savedProduct))
      showSuccessMsg('Product updated')
    } catch (err) {
      showErrorMsg('Cannot update product')
      console.log('Cannot update product', err)
    }
  }
}

