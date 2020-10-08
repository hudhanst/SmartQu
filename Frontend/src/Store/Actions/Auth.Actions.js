import axios from 'axios'

import {
    AUTH_LOADING,
    AUTH_LOADED,
    LOGIN,
    LOGOUT,
    LOAD_USER,
    TOKEN_EXPIRED,
    // RELOAD_PAGE
} from './Type.Actions'

export const Default_Header = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return config
}

export const Token_Config = (getState, headers) => {
    try {
        const token = getState().Auth.token

        const config = headers ? headers : Default_Header()

        if (token) {
            const AuthTypeHeaders = 'x-auth-token'
            config.headers[AuthTypeHeaders] = token
        }
        return config
    } catch (err) {
        console.log('Log: TokenConfig -> err', err)
        return ''
    }
}

export const Base_URL = () => {
    const URL = 'http://127.0.0.1:5000/'
    return URL
}

export const Expired_Messages = () => {
    const Messages = 'Token Expired'
    return Messages
}

export const Invalid_Token_Messages = () => {
    const Messages = 'Token invalid'
    return Messages
}


export const Log_In = (UserName, Password) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING })
        const body = JSON.stringify({ UserName, Password })
        const Responses = await axios.post(`${Base_URL()}api/auth/login`, body, Default_Header())
        if (Responses) {
            dispatch({
                type: LOGIN,
                payload: Responses.data
            })
            dispatch({ type: AUTH_LOADED })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        dispatch({ type: AUTH_LOADED })
    }
}

export const Load_User = () => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTH_LOADING })
        const Responses = await axios.get(`${Base_URL()}api/auth/user`, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOAD_USER,
                payload: Responses.data
            })
            dispatch({ type: AUTH_LOADED })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        // console.dir(err)
        if (err.response.data.msg === Expired_Messages() || err.response.data.msg === Invalid_Token_Messages()) {
            dispatch({ type: TOKEN_EXPIRED })
        }
        dispatch({ type: AUTH_LOADED })
    }
}

export const Log_Out = () => async (dispatch, getState) => {
    // console.log('logout')
    try {
        dispatch({ type: AUTH_LOADING })
        const Responses = await axios.post(`${Base_URL()}api/auth/logout`, null, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOGOUT,
                payload: Responses
            })
            dispatch({ type: AUTH_LOADED })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        if (err.response.data.msg === Expired_Messages() || err.response.data.msg === Invalid_Token_Messages()) {
            dispatch({ type: TOKEN_EXPIRED })
        }
        dispatch({ type: AUTH_LOADED })
    }
}
