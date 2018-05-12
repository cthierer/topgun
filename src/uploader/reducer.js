
import { FINISHED_UPLOAD } from './actions/finishUpload'
import { UPLOAD_FAILED } from './actions/notifyError'
import { STARTED_UPLOAD } from './actions/startUpload'

export const STATUS = Object.freeze({
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
})

export default function reduce(state = {}, {
  type,
  file = {},
  gallery,
  err,
}) {
  if (!gallery) {
    return state
  }

  const { [gallery]: fileUploads = [] } = state

  switch (type) {
    case STARTED_UPLOAD:
      return {
        ...state,
        [gallery]: [
          ...fileUploads,
          {
            fileName: file.name,
            preview: file.preview,
            status: STATUS.PENDING,
            id: fileUploads.length + 1,
          },
        ],
      }
    case FINISHED_UPLOAD:
      return {
        ...state,
        [gallery]: fileUploads.map((upload) => {
          if (upload.fileName === file.name && upload.status === STATUS.PENDING) {
            return { ...upload, status: STATUS.SUCCESS }
          }
          return upload
        }),
      }
    case UPLOAD_FAILED:
      return {
        ...state,
        [gallery]: fileUploads.map((upload) => {
          if (upload.fileName === file.name && upload.status === STATUS.PENDING) {
            return { ...upload, status: STATUS.FAILED, err }
          }
          return upload
        }),
      }
    default:
      return state
  }
}
