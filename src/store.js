
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRoutes } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import navigationReducer from './navigation/reducer'

/* global window */

const global = window || {}
const { topgun = {} } = global

const history = createHistory()
const initialState = topgun.state || {}
const routesMap = {}

const composeEnhancers = process.env.NODE_ENV !== 'production'
  ? composeWithDevTools
  : compose

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer,
} = connectRoutes(history, routesMap)

const rootReducer = combineReducers({
  location: routeReducer,
  navigation: navigationReducer,
})

const middlewares = applyMiddleware(
  routeMiddleware,
  reduxPromise,
  reduxThunk,
  createLogger(),
)

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(routeEnhancer, middlewares),
)
