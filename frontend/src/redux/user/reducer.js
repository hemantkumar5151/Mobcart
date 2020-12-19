import {actionTypes } from './actionType';

export const userReducer = (state = {currentUser: null, isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
        case actionTypes.USER_REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                currentUser: null,
                errorMessage: null
            }
        case actionTypes.USER_LOGIN_SUCCESS:
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                errorMessage: null
            }
        case actionTypes.USER_LOGIN_FAILED:
        case actionTypes.USER_REGISTER_FAILED:
            return {
                ...state,
                isLoading: false,
                currentUser: null,
                errorMessage: action.payload
            }
        case actionTypes.USER_LOGOUT: 
            return {
                ...state,
                isLoading: false,
                currentUser: false,
                errorMessage: null
            }
        default:
            return state;
    }
} 


export const userDetailReducer = (state = { currentUser: null, isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.USER_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                currentUser: null
            }
        case actionTypes.USER_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload,
                errorMessage: null
            }
        case actionTypes.USER_DETAIL_FAILED:
            return {
                ...state,
                isLoading: false,
                currentUser: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const userListReducer = (state ={ user: [], isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.USER_LIST_REQUEST:
            return {
                ...state,
                user: [],
                isLoading: true,
                errorMessage: null
            }
        case actionTypes.USER_LIST_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                errorMessage: null
            }
        case actionTypes.USER_LIST_FAILED:
            return {
                ...state,
                user: [],
                isLoading: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const userDeleteReducer = (state = { isLoading : false, success: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.USER_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionTypes.USER_DELETE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionTypes.USER_DELETE_FAILED:
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

export const userUpdateReducer = (state ={ success: false, isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return {
                ...state,
                success: false, 
                errorMessage: null,
                isLoading: true
            }
        case actionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                success: true,
                errorMessage: null,
                isLoading: false
            }
        case actionTypes.USER_UPDATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                success: null
            }
        default:
            return state;
    }
}