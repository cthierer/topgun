
import fetch from 'isomorphic-fetch'
import toggleLoading from './toggleLoading'

const cache = new Map()

export const LOADED_COLLECTION = 'LOADED_COLLECTION'
export const NO_COLLECTION_FOUND = 'NO_COLLECTION_FOUND'

async function fetchCollection(collection) {
  const response = await fetch(`/${collection}.json`)

  if (response.status >= 400) {
    throw new Error(`error retrieving collection "${collection}": ${response.status}`)
  }

  return response.json()
}

export default function loadCollection(collection) {
  return async (dispatch) => {
    await dispatch(toggleLoading(true))

    if (!cache.has(collection)) {
      cache.set(collection, fetchCollection(collection))
    }

    const dataPromise = cache.get(collection)

    try {
      const data = await dataPromise
      dispatch({
        type: LOADED_COLLECTION,
        data,
      })
    } catch (err) {
      dispatch({
        type: NO_COLLECTION_FOUND,
      })
    } finally {
      dispatch(toggleLoading(false))
    }
  }
}
