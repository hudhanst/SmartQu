import { combineReducers } from 'redux'

import General from './General.Reducers'
import Auth from './Auth.Reducers'
import User from './User.Reducers'

const RootReducers = combineReducers({
    General,
    Auth,
    User,
})

export default RootReducers