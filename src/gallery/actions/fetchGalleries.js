
import fetch from 'isomorphic-fetch'
import toggleLoading from './toggleLoading'

export const FETCHED_GALLERIES = 'FETCHED_GALLERIES'

export default function fetchGalleries(url = 'https://cdn.stage5clingan.com/galleries.json') {
  return async (dispatch) => {
    await dispatch(toggleLoading(true))

    const response = await fetch(url)

    if (!response.ok) {
      dispatch(toggleLoading(false))
      throw new Error(`problem loading gallery manifest: ${response.status}`)
    }

    const manifest = await response.json()

    dispatch({
      type: FETCHED_GALLERIES,
      data: manifest,
    })

    dispatch(toggleLoading(false))
  }
}
