
import { RESIZED_SCREEN } from './actions/resizeScreen'

/* global window */

export default function reducer(state = {
  screenWidth: window.innerWidth,
}, { type, ...action }) {
  switch (type) {
    case RESIZED_SCREEN:
      return { ...state, screenWidth: action.data }
    default:
      return state
  }
}
