
export const UPLOAD_FAILED = 'UPLOAD_FAILED'

export default function uploadFailed(err, gallery, file) {
  return (dispatch) => {
    dispatch({
      type: UPLOAD_FAILED,
      err,
      gallery,
      file,
    })
  }
}
