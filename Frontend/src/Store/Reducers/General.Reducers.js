import {
    DARK_MODE,
    HIDE_LOGO,
    RELOAD_PAGE,
} from '../Actions/Type.Actions'

const initialState = {
    isDarkMode: localStorage.getItem('SQ_General_isDarkMode'),
    isLogoHide: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DARK_MODE:
            if (action.payload === true) {
                localStorage.setItem('SQ_General_isDarkMode', action.payload)
            } else {
                localStorage.removeItem('SQ_General_isDarkMode')
            }
            return {
                ...state,
                isDarkMode: action.payload,
            }
        case HIDE_LOGO:
            console.log(action.payload)
            return {
                ...state,
                isLogoHide: action.payload ? action.payload : false
            }
        case RELOAD_PAGE: {
            // window.location.reload(true)
            window.location.reload()
            return {
                ...state
            }
        }
        default:
            return state
    }
}