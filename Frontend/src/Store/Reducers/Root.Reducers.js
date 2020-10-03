import { combineReducers } from 'redux'

import General from './General.Reducers'

const RootReducers = combineReducers({
    General,
})

export default RootReducers