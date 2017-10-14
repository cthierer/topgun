
import { UPDATED_METADATA } from './actions/updateMetadata'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case UPDATED_METADATA:
      return { ...action.data }
    default:
      return state
  }
}
