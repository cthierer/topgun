
import toggleLoading from '../../actions/toggleLoading'

const COOLDOWN = 1000

export const TOGGLED_LOADING = 'TOGGLED_LOADING_BANNER'
export default toggleLoading(TOGGLED_LOADING, COOLDOWN)
