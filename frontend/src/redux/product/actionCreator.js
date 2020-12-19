import { actionType} from './actionType';
import axios from 'axios';

export const productListRequest = () => ({
    type: actionType.PRODUCT_LIST_REQUEST
})

export const productListSuccess = product => ({
    type: actionType.PRODUCT_LIST_SUCCESS,
    payload: product
})

export const productListFailed = error => ({
    type: actionType.PRODUCT_LIST_FAILED,
    payload: error
})

export const fetchProductList = (search='', pageNumber='') => async dispatch => {
    try {
        dispatch(productListRequest());
        const { data } = await axios.get(`/api/product?keyword=${search}&pageNumber=${pageNumber}`) ;
        dispatch(productListSuccess(data))       
    } catch (error) {
        dispatch(productListFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productDetailRequest = () => ({
    type: actionType.PRODUCT_DETAIL_REQUEST,
})

export const productDetailSuccess = product => ({
    type: actionType.PRODUCT_DETAIL_SUCCESS,
    payload: product
})

export const productDetailFailed = error => ({
    type: actionType.PRODUCT_DETAIL_REQUEST,
    payload: error
})

export const  fetchProductDetail = (id,) => async dispatch => {
    try {
        dispatch(productDetailRequest());
        const { data } = await axios.get(`/api/product/${id}`) ;
        dispatch(productDetailSuccess(data.data))
    } catch (error) {
        dispatch(productDetailFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productBelongToSpecificUser = () => async (dispatch, getState) => {
    try {
        dispatch(productListRequest());
        const { currentUser} = getState().userReducer;
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const { data } = await axios.get('/api/product/admin/product',config) ;
        dispatch(productListSuccess(data))
    } catch (error) {
        dispatch(productListFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productDeleteRequest = () => ({
    type: actionType.PRODUCT_DELETE_REQUEST
})

export const productDeleteSuccess = () => ({
    type: actionType.PRODUCT_DELETE_SUCCESS
})

export const productDeleteFailed = error => ({
    type: actionType.PRODUCT_DELETE_FAILED,
    payload: error
})

export const productDelete = id => async (dispatch, getState) => {
    try {
        dispatch(productDeleteRequest());
        const { currentUser} = getState().userReducer;
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
         await axios.delete(`/api/product/admin/product/${id}`,config) ;

        dispatch(productDeleteSuccess())
        
        
    } catch (error) {
        dispatch(productDeleteFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productCreateRequest = () => ({
    type: actionType.PRODUCT_CREATE_REQUEST
})
export const productCreateSuccess = () => ({
    type: actionType.PRODUCT_CREATE_SUCCESS
})

export const productCreateFailed = error => ({
    type: actionType.PRODUCT_CREATE_FAILED,
    payload: error
})

export const productCreate = ( productDetail) => async (dispatch, getState) => {
    try {
        dispatch(productCreateRequest());
        const { currentUser} = getState().userReducer;
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        await axios.post(`/api/product/admin/product/`,productDetail,config) ;

        dispatch(productCreateSuccess())
        
        
    } catch (error) {
        dispatch(productCreateFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productUpdate = (id, productDetail) => async (dispatch, getState) => {
    try {
        dispatch(productCreateRequest());
        const { currentUser} = getState().userReducer;
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        await axios.patch(`/api/product/admin/product/${id}`, productDetail,config) ;
        dispatch(productCreateSuccess())
    } catch (error) {
        dispatch(productCreateFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const productReviewRequest = () => ({
    type: actionType.PRODUCT_REVIEW_CREATE_REQUEST
})

export const productReviewSuccess = review => ({
    type: actionType.PRODUCT_REVIEW_CREATE_SUCCESS,
    payload: review
})

export const productReviewFailed = error => ({
    type: actionType.PRODUCT_REVIEW_CREATE_FAILED,
    payload: error
})

export const productReviewCreate = (id, reviews) => async(dispatch, getState) => {
    try {
        dispatch(productReviewRequest())
        const { currentUser } = getState().userReducer
        const  config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const { data } = await axios.post(`/api/product/${id}/review`,reviews,config)
        dispatch(productReviewSuccess(data.data));
    } catch (error) {
        dispatch(productReviewFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const topProductRequest = () => ({
    type: actionType.TOP_PRODUCT_REQUEST
})

export const topProductSuccess = product => ({
    type: actionType.TOP_PRODUCT_SUCCESS,
    payload: product
})

export const topProductFailed = error => ({
    type: actionType.TOP_PRODUCT_FAILED,
    payload: error
})

export const topProduct = () => async(dispatch) => {
    try {
        dispatch(topProductRequest())
        const { data } = await axios.get('/api/product/top');
        dispatch(topProductSuccess(data.data));
    } catch (error) {
        dispatch(topProductFailed(error.response && error.response.data.message ? error.response.data.message  : error.message));
    }
}