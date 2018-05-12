
export const STARTED_UPLOAD = 'STARTED_UPLOAD'

export default function startUpload(gallery, file) {
  return dispatch => dispatch({
    type: STARTED_UPLOAD,
    gallery,
    file,
  })
}
