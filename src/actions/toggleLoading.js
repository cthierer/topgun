
import moment from 'moment'
import { sleep } from '../utils'

export default (type, cooldown = 500) => on => async (dispatch, getState) => {
  if (on) {
    dispatch({
      type,
      data: moment(),
    })
    await sleep(cooldown)
    return
  }

  const { routing = moment() } = getState()

  const timeElapsed = moment().diff(routing)
  const waitFor = timeElapsed > cooldown ? 0 : cooldown - timeElapsed

  await sleep(waitFor)

  dispatch({
    type,
    data: false,
  })
}
