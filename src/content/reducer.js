
import { LOADED_COLLECTION, NO_COLLECTION_FOUND } from './actions/loadCollection'
import { TOGGLED_LOADING } from './actions/toggleLoading'
import { UNLOADED_COLLECTION } from './actions/unloadCollection'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case LOADED_COLLECTION:
      return { ...state, collection: action.data }
    case NO_COLLECTION_FOUND:
    case UNLOADED_COLLECTION:
      return { ...state, collection: undefined }
    case TOGGLED_LOADING:
      return { ...state, loading: action.data }
    default:
      return state
  }
}
