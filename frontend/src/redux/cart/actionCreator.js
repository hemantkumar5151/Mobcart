import axios from 'axios';
import { actionTypes } from './actionType';

export const addItem = product => ({
    type: actionTypes.ADD_ITEM,
    payload: product
})

export const removeItem = productId => ({
    type: actionTypes.REMOVE_ITEM,
    payload: productId
})

export const addItemToCart = (id, qty) => async (dispatch,getState) => {
    try {
        const { data: { data } } = await axios.get(`/api/product/${id}`);
        const item = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        };
        
            dispatch(addItem(item));
            localStorage.setItem('cart',JSON.stringify(getState().cartReducer.cartItems));
        } catch (error) {
            
    }
}

export const removeItemFromCart = (id) => async(dispatch, getState) => {
    dispatch(removeItem(id));
    localStorage.setItem('cart',JSON.stringify(getState().cartReducer.cartItems));
}

export const shippingAddress = data => ({
    type: actionTypes.ADD_SHIPPING_ADDRESS,
    payload: data
})

export const addShippingAddress = (data) =>  (dispatch) => {
    
    dispatch(shippingAddress(data));

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const paymentMethod = (data) => ({
    type: actionTypes.ADD_PAYMENT_METHOD,
    payload: data
})
export const addPaymentMethod = (data) =>  (dispatch) => {

    dispatch(paymentMethod(data));

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}