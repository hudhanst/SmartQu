import {
    USER_LOADING,
    USER_LOADED,
    GET_USER_ID,
    LOAD_PROFILE,
    LOAD_USER_LIST,
} from '../Actions/Type.Actions'

const initialState = {
    isUserLoading: false,
    UserId: null,
    Profile: null,
    UserList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isUserLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isUserLoading: false
            }
        case GET_USER_ID:
            return {
                ...state,
                UserId: action.payload
            }
        case LOAD_PROFILE:
            return {
                ...state,
                Profile: action.payload
            }
        case LOAD_USER_LIST:
            return {
                ...state,
                UserList: action.payload
            }
        default:
            return state
    }
}