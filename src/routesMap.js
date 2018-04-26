
import { NOT_FOUND, redirect } from 'redux-first-router'
import loadCollection from './content/actions/loadCollection'
import loadPage from './content/actions/loadPage'
import updateMetadata from './metadata/actions/updateMetadata'
import fetchGalleries from './gallery/actions/fetchGalleries'
import config from './config'

const aliases = new Map([])

const {
  baseUri: {
    galleries: galleriesBaseUri = 'https://cdn.stage5clingan.com/galleries',
  },
} = config

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
      dispatch(fetchGalleries(`${galleriesBaseUri}/index.json`))
      dispatch(updateMetadata({
        title: 'Photos',
      }))
    },
  },
  ROUTE_TO_PAGE: {
    path: '/page/:slug',
    thunk: async (dispatch, getState) => {
      const {
        location: { payload: { slug } = {} } = {},
      } = getState()

      await dispatch(loadPage(slug))

      const {
        content: { page: loaded } = {},
      } = getState()

      if (!loaded) {
        dispatch(redirect({ type: NOT_FOUND }))
        return
      }

      const { title } = loaded
      dispatch(updateMetadata({ title }))
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
