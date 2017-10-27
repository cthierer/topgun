
import moment from 'moment'
import { sleep } from '../../utils'

const COOLDOWN = 250

export const TOGGLED_LOADING = 'TOGGLED_LOADING'

export default on => async (dispatch, getState) => {
  if (on) {
    dispatch({
      type: TOGGLED_LOADING,
      data: moment(),
    })
    await sleep(COOLDOWN)
    return
  }

  const { loading = moment() } = getState()

  const timeElapsed = moment().diff(loading)
  const waitFor = timeElapsed > COOLDOWN ? 0 : COOLDOWN - timeElapsed

  await sleep(waitFor)

  dispatch({
    type: TOGGLED_LOADING,
    data: false,
  })
}
