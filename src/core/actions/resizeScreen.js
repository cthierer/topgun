
export const RESIZED_SCREEN = 'RESIZED_SCREEN'

/* global window */

export default function resizeScreen(width = window.innerWidth) {
  return {
    type: RESIZED_SCREEN,
    data: width,
  }
}
