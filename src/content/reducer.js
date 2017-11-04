
import { LOADED_COLLECTION, NO_COLLECTION_FOUND } from './actions/loadCollection'
import { UNLOADED_COLLECTION } from './actions/unloadCollection'
import { LOADED_PAGE, NO_PAGE_FOUND } from './actions/loadPage'
import { UNLOADED_PAGE } from './actions/unloadPage'
import { TOGGLED_LOADING } from './actions/toggleLoading'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case LOADED_COLLECTION:
      return { ...state, collection: action.data }
    case NO_COLLECTION_FOUND:
    case UNLOADED_COLLECTION:
      return { ...state, collection: undefined }
    case LOADED_PAGE:
      return { ...state, page: action.data }
    case NO_PAGE_FOUND:
    case UNLOADED_PAGE:
      return { ...state, page: undefined }
    case TOGGLED_LOADING:
      return { ...state, loading: action.data }
    default:
      return state
  }
}
