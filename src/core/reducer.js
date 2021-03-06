
import { RESIZED_SCREEN } from './actions/resizeScreen'
import { SET_BANNER } from './actions/setBanner'
import { TOGGLED_LOADING } from './actions/toggleLoadingBanner'

/* global window */

export default function reducer(state = {
  screenWidth: window.innerWidth,
}, { type, ...action }) {
  switch (type) {
    case RESIZED_SCREEN:
      return { ...state, screenWidth: action.data }
    case SET_BANNER:
      return { ...state, banner: action.data }
    case TOGGLED_LOADING:
      return { ...state, loading: action.data }
    default:
      return state
  }
}
