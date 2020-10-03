import React from 'react'

import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'

import './index.css'

import Store from './Store/Store'
import App from './App'


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )

const Root = (
  <Provider
    store={Store}
  >
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))

// serviceWorker.unregister()
serviceWorker.register() // https://bit.ly/CRA-PWA
