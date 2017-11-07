
import fetch from 'isomorphic-fetch'
import toggleLoading from './toggleLoading'

export const FETCHED_GALLERIES = 'FETCHED_GALLERIES'

async function fetchImages(galleryUrl) {
  const response = await fetch(`${galleryUrl}/index.json`)

  if (!response.ok) {
    throw new Error(`problem loading images for gallery ${galleryUrl}: ${response.status}`)
  }

  return response.json()
}

export default function fetchGalleries(url = 'https://cdn.stage5clingan.com/galleries/index.json') {
  return async (dispatch) => {
    await dispatch(toggleLoading(true))

    const response = await fetch(url)

    if (!response.ok) {
      dispatch(toggleLoading(false))
      throw new Error(`problem loading gallery manifest: ${response.status}`)
    }

    const galleries = await response.json()
    const withImages = await Promise.all(galleries.map(async ({
      path,
      ...gallery
    }) => {
      try {
        const images = await fetchImages(path)
        return { ...gallery, images }
      } catch (e) {
        return { ...gallery, images: [] }
      }
    }))

    dispatch({
      type: FETCHED_GALLERIES,
      data: withImages,
    })

    dispatch(toggleLoading(false))
  }
}
