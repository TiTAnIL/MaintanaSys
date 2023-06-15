
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducers/product.reducer'
import { userReducer } from './reducers/user.reducer'
import { usersReducer } from './reducers/users.reducer'
import { authReducer } from './reducers/auth.reducer'
// import { cartReducer } from './reducers/cart.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    userModule: userReducer,
    usersModule: usersReducer,
    authModule: authReducer,
    productModule: productReducer,
})


export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.gStore = store