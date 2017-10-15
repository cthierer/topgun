
import { FETCHED_GALLERIES } from './actions/fetchGalleries'

export default function reducer(state = {}, { type, ...action }) {
  switch (type) {
    case FETCHED_GALLERIES:
      return { ...state, galleries: action.data }
    default:
      return state
  }
}
