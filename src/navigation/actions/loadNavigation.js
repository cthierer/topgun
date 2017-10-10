
export const LOADED_NAVIGATION = 'LOADED_NAVIGATION'

export default function loadNavigation(navigation) {
  return dispatch => dispatch({
    type: LOADED_NAVIGATION,
    data: navigation,
  })
}
