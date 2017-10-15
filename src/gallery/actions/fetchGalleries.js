
import fetch from 'isomorphic-fetch'

export const FETCHED_GALLERIES = 'FETCHED_GALLERIES'

export default function fetchGalleries(url = 'http://cdn.stage5clingan.com/galleries.json') {
  return async (dispatch) => {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`problem loading gallery manifest: ${response.status}`)
    }

    const manifest = await response.json()
    dispatch({
      type: FETCHED_GALLERIES,
      data: manifest,
    })
  }
}
