import { combineReducers } from 'redux'

import General from './General.Reducers'
import Auth from './Auth.Reducers'

const RootReducers = combineReducers({
    General,
    Auth,
})

export default RootReducers