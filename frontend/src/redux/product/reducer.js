import {  actionType } from "./actionType";

const initialState = {
    isLoading: false,
    products: [],
    errorMessage: null
}

export const productCreateReducer = (state ={ success: false, isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false ,
                errorMessage: null
            }
        case actionType.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.PRODUCT_CREATE_FAILED:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const productListReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.PRODUCT_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload.data,
                page: action.payload.page,
                pages: action.payload.pages,
                errorMessage: null
            }
        case actionType.PRODUCT_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state
    }
}
export const productDetailReducer = (state = {isLoading: true, product: null, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                product: null,
                errorMessage: null
            }
        case actionType.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                errorMessage: null
            }
        case actionType.PRODUCT_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                product: null,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export const productUpdateReducer = (state ={ success: false, isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false ,
                errorMessage: null
            }
        case actionType.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.PRODUCT_CREATE_FAILED:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const productDeleteReducer = (state ={ isLoading: false, success : false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                success: false
            }
        case actionType.PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.PRODUCT_DELETE_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const productReviewReducer = (state ={ isLoading: false, success : false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.PRODUCT_REVIEW_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                success: false
            }
        case actionType.PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.PRODUCT_REVIEW_CREATE_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        case actionType.PRODUCT_REVIEW_CREATE_RESET:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                success: false,
            }
        default:
            return state;
    }
}

export const topProductReducer = (state = { isLoading: false, product: [], errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.TOP_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                product: [],
                errorMessage: null
            }
        case actionType.TOP_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                errorMessage: null
            }
        case actionType.TOP_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                product: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}