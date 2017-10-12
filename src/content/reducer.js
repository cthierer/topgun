
import { LOADED_COLLECTION, NO_COLLECTION_FOUND } from './actions/loadCollection'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case LOADED_COLLECTION:
      const { data: collection } = action
      return { ...state, collection }
    case NO_COLLECTION_FOUND:
      return { ...state, collection: undefined }
    default:
      return state
  }
}
