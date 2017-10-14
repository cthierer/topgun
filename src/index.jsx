
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import AppNavBar from './containers/AppNavBar'
import AppBanner from './containers/AppBanner'
import App from './App'
import { get } from './utils'
import handleResize from './resize'

import './styles/index.css'

/* global window document */

const config = window.topgun || {}
const getConfig = get(config)
const topNavElement = document.getElementById('topNav')
const appElement = document.getElementById('app')
const bannerElement = document.getElementById('banner')

if (!getConfig('navigation.disable') && topNavElement) {
  render(
    <Provider store={store}><AppNavBar /></Provider>,
    topNavElement,
  )
}

if (appElement) {
  render(
    <Provider store={store}><App /></Provider>,
    appElement,
  )
}

if (bannerElement) {
  render(
    <Provider store={store}><AppBanner /></Provider>,
    bannerElement,
  )
}

const doResize = handleResize(store)

window.addEventListener('resize', doResize, false)
doResize()
