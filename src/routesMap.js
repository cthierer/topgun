
import { NOT_FOUND } from 'redux-first-router'
import loadCollection from './content/actions/loadCollection'

const aliases = new Map([
  ['our-day', 'event'],
])

export default {
  ROUTE_TO_SECTION: {
    path: '/:collection/:page?',
    thunk: async (dispatch, getState) => {
      const {
        content: { collection: { key } = {} } = {},
        location: { payload: { collection } = {} } = {},
      } = getState()

      if (!key || key !== collection) {
        const toLoad = aliases.get(collection) || collection
        await dispatch(loadCollection(toLoad))

        const {
          content: { collection: loaded } = {}
        } = getState()

        if (!loaded) {
          dispatch({ type: NOT_FOUND })
        }
      }
    },
  },
}