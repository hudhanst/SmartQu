import {
    AUTH_LOADING,
    AUTH_LOADED,
    LOGIN,
    LOGOUT,
    LOAD_USER,
    TOKEN_EXPIRED,
} from '../Actions/Type.Actions'

const initialState = {
    token: localStorage.getItem('SQ_Auth_token'),
    isAuth: localStorage.getItem('SQ_Auth_isAuth'),
    isAuthLoading: false,
    User: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isAuthLoading: true
            }
        case AUTH_LOADED:
            return {
                ...state,
                isAuthLoading: false
            }
        case LOGIN:
            localStorage.setItem('SQ_Auth_token', action.payload.token)
            localStorage.setItem('SQ_Auth_isAuth', true)
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                User: action.payload.user
            }
        case LOGOUT:
        case TOKEN_EXPIRED:
            localStorage.clear();
            return {
                ...state,
                token: null,
                isAuth: false,
                User: null,
            }
        case LOAD_USER:
            return {
                ...state,
                User: action.payload
            }
        default:
            return state
    }
}