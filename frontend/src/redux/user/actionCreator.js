import Axios from 'axios';
import { actionTypes } from './actionType';

export const userLoginRequest = () => ({
    type: actionTypes.USER_LOGIN_REQUEST,
});

export const userLoginSuccess = user => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: user
});

export const userLoginFailed = error => ({
    type: actionTypes.USER_LOGIN_FAILED,
    payload: error
});

export const userLogout = () => ({
    type: actionTypes.USER_LOGOUT,
});

export const userLogin = (email, password) => async(dispatch, getState) => {
    try {
        dispatch(userLoginRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await Axios.post('/api/user/login', { email, password}, config);
        setTimeout(() => {
            dispatch(userLoginSuccess(data.data));
            
            localStorage.setItem('currentUser', JSON.stringify(getState().userReducer.currentUser));
        }, 2000);

    } catch (error) {
        dispatch(userLoginFailed(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
}

export const userRegisterRequest = () => ({
    type: actionTypes.USER_REGISTER_REQUEST,
});

export const userRegisterSuccess = user => ({
    type: actionTypes.USER_REGISTER_SUCCESS,
    payload: user
});

export const userRegisterFailed = error => ({
    type: actionTypes.USER_REGISTER_FAILED,
    payload: error
});

export const userRegister = (name, email, password) => async(dispatch, getState) => {
    try {     
        dispatch(userRegisterRequest())

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await Axios.post('/api/user/register', {name, email, password}, config);
        setTimeout(() => {
            dispatch(userRegisterSuccess(data.data));
            
            localStorage.setItem('currentUser', JSON.stringify(getState().userReducer.currentUser));
        }, 3000);

    } catch (error) {
        dispatch(userRegisterFailed(error.response && error.response.data.message ? error.response.data.message : error.message));
    }


}

export const userDetailRequest = () => ({
    type: actionTypes.USER_DETAIL_REQUEST,
});

export const userDetailSuccess = user => ({
    type: actionTypes.USER_DETAIL_SUCCESS,
    payload: user
});

export const userDetailFailed = error => ({
    type: actionTypes.USER_DETAIL_FAILED,
    payload: error
});

export const userProfile = () => async(dispatch, getState) => {
    try {
        dispatch(userDetailRequest());        
        const { currentUser } = getState().userReducer
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }

            const { data } = await Axios.get('/api/user/profile', config);
            dispatch(userDetailSuccess(data.data));
        
    } catch (error) {
        dispatch(userDetailFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}

export const userProfileUpdate = (name, email, password) => async(dispatch, getState) => {
    try {
        dispatch(userDetailRequest());
        
        const { currentUser } = getState().userReducer
       
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }

        const { data } = await Axios.patch('/api/user/profile', {name,email, password}, config);
        
        setTimeout(() => {  

            dispatch(userDetailSuccess(data.data));
            dispatch(userLoginSuccess(data.data));
            localStorage.setItem('currentUser', JSON.stringify(data.data));

        }, 3000);
        
    } catch (error) {
        dispatch(userDetailFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}
export const userListRequest = () => ({
    type: actionTypes.USER_DETAIL_FAILED,
});

export const userListSuccess = user => ({
    type: actionTypes.USER_LIST_SUCCESS,
    payload: user
});

export const userListFailed = error => ({
    type: actionTypes.USER_LIST_FAILED,
    payload: error
});

export const userList = () => async (dispatch, getState) => {
    try {
        dispatch(userListRequest());
        const { currentUser } = getState().userReducer
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        const { data }  = await Axios.get('/api/user',config)
        dispatch(userListSuccess(data.data));
        
    } catch (error) {
        dispatch(userDetailFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}

const userDeleteRequest = () => ({
    type: actionTypes.USER_DELETE_REQUEST
})

const userDeleteSuccess = () => ({
    type: actionTypes.USER_DELETE_SUCCESS,
})

const userDeleteFailed = error => ({
    type: actionTypes.USER_DELETE_FAILED,
    payload: error
})

export const userDelete = id => async (dispatch, getState) => {
    try {
        dispatch(userDeleteRequest());
        const { currentUser } = getState().userReducer
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        await Axios.delete(`/api/user/${id}`,config)
        dispatch(userDeleteSuccess());
        
    } catch (error) {
        dispatch(userDeleteFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}

export const userDetail = (id) => async(dispatch, getState) => {
    try {
        dispatch(userDetailRequest());        
        const { currentUser } = getState().userReducer
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }

            const { data } = await Axios.get(`/api/user/${id}`, config);
            dispatch(userDetailSuccess(data.data));
        
    } catch (error) {
        dispatch(userDetailFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}

export const userUpdateRequest = () => ({
    type: actionTypes.USER_UPDATE_REQUEST
})

export const userUpdateSuccess = () => ({
    type: actionTypes.USER_UPDATE_SUCCESS,
})

export const userUpdateFailed = error => ({
    type: actionTypes.USER_UPDATE_FAILED,
    payload: error
})
export const userUpdate = (id, details) => async(dispatch, getState) => {
    try {
        dispatch(userUpdateRequest());        
        const { currentUser } = getState().userReducer
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser.token}`
            }
        }
            await Axios.patch(`/api/user/${id}`, details , config);
            dispatch(userUpdateSuccess());
            
    } catch (error) {
        dispatch(userUpdateFailed(error.message  && error.response.data.message ? error.response.data.message : error.message));
    }
}