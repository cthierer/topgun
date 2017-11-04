
import { NOT_FOUND, redirect } from 'redux-first-router'
import loadCollection from './content/actions/loadCollection'
import updateMetadata from './metadata/actions/updateMetadata'
import fetchGalleries from './gallery/actions/fetchGalleries'

const aliases = new Map([])

export default {
  ROUTE_TO_LANDING: {
    path: '/',
    thunk: async (dispatch) => {
      dispatch(updateMetadata({
        title: 'Lindsay & Thomas\'s Wedding',
      }))
    },
  },
  ROUTE_TO_GALLERIES: {
    path: '/photos/:gallery?',
    thunk: async (dispatch) => {
      dispatch(fetchGalleries())
      dispatch(updateMetadata({
        title: 'Photos',
      }))
    },
  },
  ROUTE_TO_SECTION: {
    path: '/:collection/:page?',
    thunk: async (dispatch, getState) => {
      const {
        content: { collection: { key } = {} } = {},
        location: { payload: { collection, page } = {} } = {},
      } = getState()

      if (!key || key !== collection) {
        const toLoad = aliases.get(collection) || collection
        await dispatch(loadCollection(toLoad))

        const {
          content: { collection: loaded } = {},
        } = getState()

        if (!loaded) {
          dispatch(redirect({ type: NOT_FOUND }))
          return
        }
      }

      const { content: { collection: loaded } = {} } = getState()

      if (loaded) {
        const { title } = page
          ? loaded.files.find(({ slug }) => slug === page)
          : loaded
        dispatch(updateMetadata({ title }))
      }
    },
  },
}
