
export const FINISHED_UPLOAD = 'FINISHED_UPLOAD'

export default function finishUpload(gallery, file) {
  return dispatch => dispatch({
    type: FINISHED_UPLOAD,
    file,
    gallery,
  })
}
