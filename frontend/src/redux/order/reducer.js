import {actionTypes } from './actionType';

export const orderReducer = (state ={ isLoading: false, order: null, errorMessage: null} ,action) => {
    switch (action.type) {
        case actionTypes.ORDER_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                order: null
            }
        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                errorMessage: null
            }
        case actionTypes.ORDER_CREATE_FAILED:
            return {
                ...state,
                isLoading: false,
                order: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const orderDetailReducer = (state = { isLoading: true, order: null, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                order: null,
                errorMessage: null
            }
        case actionTypes.ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                errorMessage: null
            }
        case actionTypes.ORDER_DETAIL_FAILED:
            return{ 
                ...state,
                isLoading: false,
                order: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const orderPayReducer = (state= {isLoading: false, success: true, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAY_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null,
            }
        case actionTypes.ORDER_PAY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionTypes.ORDER_PAY_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        case actionTypes.ORDER_PAY_RESET:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: null
            }
        default:
            return state
    }
}

export const orderListReducer =  (state= {isLoading: false, order: [], errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                order: [],
                errorMessage: null,
            }
        case actionTypes.ORDER_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                errorMessage: null
            }
        case actionTypes.ORDER_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                order: [],
                errorMessage: action.payload
            }
        default:
            return state
    }
}


export const orderDeliverReducer = (state= {isLoading: false, success: true, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAY_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null,
            }
        case actionTypes.ORDER_PAY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionTypes.ORDER_PAY_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        case actionTypes.ORDER_PAY_RESET:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: null
            }
        default:
            return state
    }
}