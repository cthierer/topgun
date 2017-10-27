
import moment from 'moment'
import { sleep } from '../../utils'

const COOLDOWN = 250

export const TOGGLED_ROUTING = 'TOGGLED_ROUTING'

export default on => async (dispatch, getState) => {
  if (on) {
    dispatch({
      type: TOGGLED_ROUTING,
      data: moment(),
    })
    await sleep(COOLDOWN)
    return
  }

  const { routing = moment() } = getState()

  const timeElapsed = moment().diff(routing)
  const waitFor = timeElapsed > COOLDOWN ? 0 : COOLDOWN - timeElapsed

  await sleep(waitFor)

  dispatch({
    type: TOGGLED_ROUTING,
    data: false,
  })
}
