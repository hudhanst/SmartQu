import axios from 'axios'

import {
    // AUTH_LOADING,
    // AUTH_LOADED,
    LOGIN,
    LOGOUT,
    LOAD_USER,
    TOKEN_EXPIRED,
    RELOAD_PAGE,
    ACTION_LOADING,
    ACTION_LOADED,
    // COMPONENT_LOADING,
    // COMPONENT_LOADED,
    PAGE_LOADING,
    PAGE_LOADED,
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
        dispatch({ type: ACTION_LOADING })
        const body = JSON.stringify({ UserName, Password })
        const Responses = await axios.post(`${Base_URL()}api/auth/login`, body, Default_Header())
        if (Responses) {
            dispatch({
                type: LOGIN,
                payload: Responses.data
            })
            dispatch({ type: ACTION_LOADED })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        setTimeout(() => null, 300000)
        dispatch({ type: ACTION_LOADED })
    }
}

export const Load_User = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PAGE_LOADING })
        const Responses = await axios.get(`${Base_URL()}api/auth/user`, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOAD_USER,
                payload: Responses.data
            })
            dispatch({ type: PAGE_LOADED })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        // console.dir(err)
        if (err.response.data.msg === Expired_Messages() || err.response.data.msg === Invalid_Token_Messages()) {
            dispatch({ type: TOKEN_EXPIRED })
            dispatch({ type: RELOAD_PAGE })
        }
        dispatch({ type: PAGE_LOADED })
    }
}

export const Log_Out = () => async (dispatch, getState) => {
    // console.log('logout')
    try {
        dispatch({ type: ACTION_LOADING })
        const Responses = await axios.post(`${Base_URL()}api/auth/logout`, null, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOGOUT,
                payload: Responses
            })
            dispatch({ type: ACTION_LOADED })
            dispatch({ type: RELOAD_PAGE })
        }
    } catch (err) {
        console.log('Log: Log_In -> err', err)
        if (err.response.data.msg === Expired_Messages() || err.response.data.msg === Invalid_Token_Messages()) {
            dispatch({ type: TOKEN_EXPIRED })
        }
        dispatch({ type: ACTION_LOADED })
    }
}

export const Permission_isSuperUser = (AccountAuth) => (dispatch) => {
    // console.log('logout')
    try {
        const User = AccountAuth
        if (User.isSuperUser) {
            return true
        } else {
            const newError = ({
                msg: 'This Action are forbidden'
            })
            throw newError
        }
    } catch (err) {
        return err
    }
}
