import { actionTypes } from './actionType';
import axios from 'axios';
export const orderCreateRequest = () => ({
    type: actionTypes.ORDER_CREATE_REQUEST
})

export const orderCreateSuccess = order => ({
    type: actionTypes.ORDER_CREATE_SUCCESS,
    payload: order
})

export const orderCreateFailed = error => ({
    type: actionTypes.ORDER_CREATE_FAILED,
    payload: error
})

export const createOrder = details => async (dispatch,getState) => {
    try {
        dispatch(orderCreateRequest())
        const { currentUser} = getState().userReducer
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const { data } = await axios.post('/api/order', details, config);
        dispatch(orderCreateSuccess(data.data));
    } catch (error) {
        orderCreateFailed(orderCreateFailed(error.response && error.response.data.message ? error.response.data.message: error.message));
    }
}


export const orderDetailRequest = () => ({
    type: actionTypes.ORDER_DETAIL_REQUEST,
})

export const orderDetailSuccess = order => ({
    type: actionTypes.ORDER_DETAIL_SUCCESS,
    payload: order
})

export const orderDetailFailed  = error => ({
    type: actionTypes.ORDER_CREATE_FAILED,
    payload: error
})

export const orderDetail = id => async (dispatch, getState) => {
    try {
        dispatch(orderDetailRequest())
        const { currentUser} = getState().userReducer
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const { data } = await axios.get(`/api/order/${id}`, config);
        dispatch(orderDetailSuccess(data.data));

    } catch (error) {
        dispatch(orderDetailFailed(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
}

export const orderPayRequest = () => ({
    type: actionTypes.ORDER_PAY_REQUEST
})

export const orderPaySuccess = () => ({
    type: actionTypes.ORDER_PAY_SUCCESS
})

export const orderPayFailed = error => ({
    type: actionTypes.ORDER_PAY_FAILED,
    payload: error
})

export const orderPayReset =() => ({
    type: actionTypes.ORDER_PAY_RESET,
})

export const orderUpdateToPaid = (orderId, paymentResult ) => async (dispatch, getState) => {
    try {
        dispatch(orderPayRequest());

        const { currentUser} = getState().userReducer
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        await axios.patch(`/api/order/${orderId}/pay`, paymentResult, config);
        dispatch(orderPaySuccess());
    } catch (error) {
        dispatch(orderPayFailed(error.response && error.response.data.message ? error.response.data.message : error.message));   
    }
}

export const paymentReset = () => dispatch => {
    dispatch(orderPayReset());
}


export const orderListRequest = () => ({
    type: actionTypes.ORDER_LIST_REQUEST
})

export const orderListSuccess = order => ({
    type: actionTypes.ORDER_LIST_SUCCESS,
    payload: order
})

export const orderListFailed = error => ({
    type: actionTypes.ORDER_LIST_FAILED,
    errorMessage: error
})

export const orderList = () => async(dispatch, getState) => {

    try {
        dispatch(orderListRequest())
        const { currentUser} = getState().userReducer
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
           if(currentUser.isAdmin){    
                const { data } = await axios.get('/api/order',config);
                dispatch(orderListSuccess(data.data));
           }
           else {   
                const { data } = await axios.get('/api/order/myorder',config);
                dispatch(orderListSuccess(data.data));
           }

    } catch (error) {
        dispatch(orderListFailed(error.response && error.response.data.message ? error.response.data.message : error.message));   
    }
}
export const orderDeliverRequest = () => ({
    type: actionTypes.ORDER_DELIVER_REQUEST
})

export const orderDeliverSuccess = () => ({
    type: actionTypes.ORDER_DELIVER_SUCCESS
})

export const orderDeliverFailed = error => ({
    type: actionTypes.ORDER_DELIVER_FAILED,
    payload: error
})

export const orderDeliverReset =() => ({
    type: actionTypes.ORDER_DELIVER_RESET,
})

export const orderUpdateToDeliver = (orderId ) => async (dispatch, getState) => {
    try {
        dispatch(orderDeliverRequest());
        const { currentUser} = getState().userReducer
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        await axios.patch(`/api/order/${orderId}/deliver`, {} ,config);
        dispatch(orderDeliverSuccess());

    } catch (error) {
        dispatch(orderDeliverFailed(error.response && error.response.data.message ? error.response.data.message : error.message));   
    }
}
