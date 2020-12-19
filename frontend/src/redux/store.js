import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer';


const cartItemFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))  : [];
const currentUserFromStorage = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'PayPal';
const initialState = {
    cartReducer: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,

    },
    userReducer: {
        currentUser: currentUserFromStorage
    }

}
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware( thunk, logger)));

export default store;