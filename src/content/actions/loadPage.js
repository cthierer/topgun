
import fetch from 'isomorphic-fetch'
import toggleLoading from './toggleLoading'

const cache = new Map()

export const LOADED_PAGE = 'LOADED_PAGE'
export const NO_PAGE_FOUND = 'NO_PAGE_FOUND'

async function fetchPage(page) {
  const response = await fetch(`/${page}.json`)

  if (response.status >= 400) {
    throw new Error(`error retrieving page "${page}": ${response.status}`)
  }

  return response.json()
}

export default function loadPage(page) {
  return async (dispatch) => {
    await dispatch(toggleLoading(true))

    if (!cache.has(page)) {
      cache.set(page, fetchPage(page))
    }

    const dataPromise = cache.get(page)

    try {
      const data = await dataPromise
      dispatch({
        type: LOADED_PAGE,
        data,
      })
    } catch (err) {
      dispatch({
        type: NO_PAGE_FOUND,
      })
    } finally {
      dispatch(toggleLoading(false))
    }
  }
}
