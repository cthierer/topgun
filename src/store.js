
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import createHistory from 'history/createBrowserHistory'
import navigationReducer from './navigation/reducer'
import contentReducer from './content/reducer'
import metadataReducer from './metadata/reducer'
import routesMap from './routesMap'

/* global window */

const global = window || {}
const { topgun = {} } = global

const history = createHistory()
const initialState = topgun.state || {}

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer,
} = connectRoutes(history, routesMap, {
  restoreScroll: restoreScroll({
    shouldUpdateScroll: (prev, { type, ...locationState }) => {
      if (type === 'ROUTE_TO_SECTION') {
        const { payload: { collection, page } = {} } = locationState
        return page || collection
      }

      return true
    },
  }),
  onBeforeChange: (dispatch, getState, { action: { type } }) => {
    if (type === NOT_FOUND) {
      dispatch(redirect({ type: 'ROUTE_TO_LANDING' }))
    }
  },
})

const rootReducer = combineReducers({
  location: routeReducer,
  navigation: navigationReducer,
  content: contentReducer,
  metadata: metadataReducer,
})

const middlewares = applyMiddleware(
  routeMiddleware,
  reduxThunk,
  createLogger(),
)

export default createStore(
  rootReducer,
  initialState,
  compose(routeEnhancer, middlewares),
)
