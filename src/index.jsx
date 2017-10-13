
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppNavBar from './containers/AppNavBar'
import App from './App'
import { get } from './utils'

import './styles/index.css'

/* global window document */

const config = window.topgun || {}
const getConfig = get(config)

if (!getConfig('navigation.disable')) {
  render(
    <Provider store={store}><AppNavBar /></Provider>,
    document.getElementById('topNav'),
  )
}

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app'),
)
