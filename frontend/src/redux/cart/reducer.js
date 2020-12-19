import { actionTypes } from './actionType';

const initialState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM:
        const item = action.payload

        const existItem = state.cartItems.find((x) => x.product === item.product)
        if (existItem) {
            return {
            ...state,
            cartItems: state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
            ),
            }
        } 
        else {
            return {
            ...state,
            cartItems: [...state.cartItems, item],
            }
        }
        case actionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case actionTypes.ADD_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case actionTypes.ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state;
    }
}