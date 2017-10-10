
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import loadNavigation from './navigation/actions/loadNavigation'
import AppNavBar from './navigation/containers/AppNavBar'
import './styles/index.css'

/* global window */

const config = window.topgun || {}
const getConfig = path => path.split('.').reduce((ref, attr) => ref && ref[attr], config)

if (!getConfig('navigation.disable')) {
  render(
    <Provider store={store}><AppNavBar /></Provider>,
    document.getElementById('topNav'),
  )
}
