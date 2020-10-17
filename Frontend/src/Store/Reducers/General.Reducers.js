import {
    DARK_MODE,
    HIDE_LOGO,
    RELOAD_PAGE,
    ACTION_LOADING,
    ACTION_LOADED,
    COMPONENT_LOADING,
    COMPONENT_LOADED,
    PAGE_LOADING,
    PAGE_LOADED,
} from '../Actions/Type.Actions'

const initialState = {
    isDarkMode: localStorage.getItem('SQ_General_isDarkMode'),
    isLogoHide: false,
    isActionLoading: false,
    isComponentLoading: false,
    isPageLoading: false,
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
        case ACTION_LOADING:
            return {
                ...state,
                isActionLoading: true
            }
        case ACTION_LOADED:
            return {
                ...state,
                isActionLoading: false
            }
        case COMPONENT_LOADING:
            return {
                ...state,
                isComponentLoading: true
            }
        case COMPONENT_LOADED:
            return {
                ...state,
                isComponentLoading: false
            }
        case PAGE_LOADING:
            return {
                ...state,
                isPageLoading: true
            }
        case PAGE_LOADED:
            return {
                ...state,
                isPageLoading: false
            }
        default:
            return state
    }
}