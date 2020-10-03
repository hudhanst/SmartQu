import {
    DARK_MODE,
    HIDE_LOGO,
    // RELOAD_PAGE
} from './Type.Actions'

export const Dark_Mode = (isDarkMode) => (dispatch) => {
    dispatch({
        type: DARK_MODE,
        payload: isDarkMode
    })
    // dispatch({ type: RELOAD_PAGE })
}

export const Hide_Logo = (isLogoHide) => (dispatch) => {
    dispatch({ 
        type: HIDE_LOGO,
        payload: isLogoHide
     })
}