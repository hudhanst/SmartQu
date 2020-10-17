import axios from 'axios'

import {
    // USER_LOADING,
    // USER_LOADED,
    GET_USER_ID,
    LOAD_PROFILE,
    LOAD_USER_LIST,
    RELOAD_PAGE,
    ACTION_LOADING,
    ACTION_LOADED,
    COMPONENT_LOADING,
    COMPONENT_LOADED,
} from './Type.Actions'

import { Base_URL, Token_Config, Permission_isSuperUser } from './Auth.Actions'

export const Get_User_Id = (UserId) => (dispatch) => {
    // console.log('Log: Get_User_Id -> UserId', UserId)
    dispatch({
        type: GET_USER_ID,
        payload: UserId
    })
}

export const Load_Profile = (UserId) => async (dispatch, getState) => {
    try {
        dispatch({ type: COMPONENT_LOADING })
        const Responses = await axios.get(`${Base_URL()}api/users/user/${UserId}`, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOAD_PROFILE,
                payload: Responses.data
            })
            dispatch({ type: COMPONENT_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Profile -> err', err)
        dispatch({ type: COMPONENT_LOADED })
    }
}

export const Load_User_List = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COMPONENT_LOADING })
        const Responses = await axios.get(`${Base_URL()}api/users/`, Token_Config(getState))
        if (Responses) {
            dispatch({
                type: LOAD_USER_LIST,
                payload: Responses.data
            })
            dispatch({ type: COMPONENT_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_User_List -> err', err)
        dispatch({ type: COMPONENT_LOADED })
    }
}

export const Register_New_User = (UserData, AccountAuth) => async (dispatch, getState) => {
    // console.log('Log: Register_New_User -> UserData', UserData)
    // console.log('Log: Register_New_User -> AccountAuth', AccountAuth)
    try {
        dispatch({ type: ACTION_LOADING })
        const isAllowed = Permission_isSuperUser(AccountAuth)
        if (isAllowed) {
            const BodyData = new FormData()

            BodyData.append("UserName", UserData.UserName)
            BodyData.append("Name", UserData.Name)
            BodyData.append("Password", UserData.Password)
            // if (UserData.ProfilePicture !== null) {
            BodyData.append("ProfilePicture", UserData.ProfilePicture ? UserData.ProfilePicture : null)
            // }
            BodyData.append("isAdmin", UserData.isAdmin)
            BodyData.append("isSuperUser", UserData.isSuperUser)

            const Responses = await axios.post(`${Base_URL()}api/users/registration`, BodyData, Token_Config(getState))
            if (Responses) {
                // dispatch({
                //     type: LOAD_USER_LIST,
                //     payload: Responses.data
                // })
                dispatch({ type: ACTION_LOADED })
                dispatch({ type: RELOAD_PAGE })
            }
        }
    } catch (err) {
        console.log('Log: Register_New_User -> err', err)
        dispatch({ type: ACTION_LOADED })
    }
}

export const Update_User = (UserId, UpdateData, AccountAuth) => async (dispatch, getState) => {
    console.log('Log: Update_User -> UserId', UserId)
    try {
        dispatch({ type: ACTION_LOADING })
        const isAllowed = Permission_isSuperUser(AccountAuth)
        if (isAllowed) {
            const BodyData = new FormData()

            // BodyData.append("UserName", UpdateData.UserName)
            BodyData.append("Password", UpdateData.Password)
            BodyData.append("Name", UpdateData.Name)
            // if (UpdateData.ProfilePicture !== null) {
            BodyData.append("ProfilePicture", UpdateData.ProfilePicture ? UpdateData.ProfilePicture : null)
            // }
            BodyData.append("isActive", UpdateData.isActive)
            BodyData.append("isAdmin", UpdateData.isAdmin)
            BodyData.append("isSuperUser", UpdateData.isSuperUser)

            const Responses = await axios.post(`${Base_URL()}api/users/user/${UserId}/update`, BodyData, Token_Config(getState))
            if (Responses) {
                dispatch({ type: ACTION_LOADED })
                dispatch({ type: RELOAD_PAGE })
            }
        }
    } catch (err) {
        console.log('Log: Update_User -> err', err)
        dispatch({ type: ACTION_LOADED })
    }
}

export const Delete_User = (DeletedUserId, AccountAuth) => async (dispatch, getState) => {
    try {
        dispatch({ type: ACTION_LOADING })
        const isAllowed = Permission_isSuperUser(AccountAuth)
        if (isAllowed) {
            const Responses = await axios.delete(`${Base_URL()}api/users/user/${DeletedUserId}/delete`, Token_Config(getState))
            if (Responses) {
                dispatch({ type: ACTION_LOADED })
                dispatch({ type: RELOAD_PAGE })
            }
        }
    } catch (err) {
        console.log('Log: DeleteUser -> err', err)
        dispatch({ type: ACTION_LOADED })
    }
}