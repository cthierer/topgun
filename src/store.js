
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import { connectRoutes, NOT_FOUND, redirect } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import createHistory from 'history/createBrowserHistory'
import navigationReducer from './navigation/reducer'
import contentReducer from './content/reducer'
import metadataReducer from './metadata/reducer'
import coreReducer from './core/reducer'
import changeBanner from './core/actions/changeBanner'
import galleryReducer from './gallery/reducer'
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
  onBeforeChange: (
    dispatch,
    getState,
    {
      action: {
        type,
        meta: {
          location: {
            current: {
              pathname,
              payload: {
                collection: nextCollection,
              } = {},
            },
            prev: {
              payload: {
                collection: prevCollection,
              } = {},
            },
          },
        },
      },
    },
  ) => {
    if (type === NOT_FOUND) dispatch(redirect({ type: 'ROUTE_TO_LANDING' }))
    if (nextCollection !== prevCollection || nextCollection === undefined) {
      dispatch(changeBanner(pathname))
    }
  },
  onAfterChange: (dispatch, getState) => {
    const { location: { pathname } = {} } = getState()
    if (window.ga && pathname) {
      window.ga('set', 'page', pathname)
      window.ga('send', 'pageview')
    }
  },
})

const rootReducer = combineReducers({
  location: routeReducer,
  navigation: navigationReducer,
  content: contentReducer,
  metadata: metadataReducer,
  core: coreReducer,
  gallery: galleryReducer,
})

const middlewares = [
  routeMiddleware,
  reduxThunk,
]

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger') // eslint-disable-line global-require
  middlewares.push(logger)
}

export default createStore(
  rootReducer,
  initialState,
  compose(routeEnhancer, applyMiddleware(...middlewares)),
)
