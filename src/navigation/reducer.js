
import { LOADED_NAVIGATION } from './actions/loadNavigation'

export default function reduce(state = [], { type, ...action }) {
  switch (type) {
    case LOADED_NAVIGATION:
      return action.data
    default:
      return state
  }
}
