import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import RootReducers from './Reducers/Root.Reducers'

const InitialState = {}
const Middleware = [
    thunk
]

const Store = createStore(
    RootReducers,
    InitialState,
    compose(
        applyMiddleware(...Middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
)

export default Store