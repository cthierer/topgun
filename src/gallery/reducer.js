
import { FETCHED_GALLERIES } from './actions/fetchGalleries'
import { TOGGLED_LOADING } from './actions/toggleLoading'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case FETCHED_GALLERIES:
      return { ...state, galleries: action.data }
    case TOGGLED_LOADING:
      return { ...state, loading: action.data }
    default:
      return state
  }
}
