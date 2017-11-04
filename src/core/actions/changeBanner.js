
import toggleLoading from './toggleLoadingBanner'
import setBanner from './setBanner'
import { getRandom } from '../../utils'

export default pathname => async (dispatch, getState) => {
  await dispatch(toggleLoading(true))

  const { core: { banners = [] } = {} } = getState()
  const {
    images: possibleBanners,
    ...attrs
  } = banners.find(({ route }) => pathname.match(route) !== null)
  const banner = possibleBanners[getRandom(possibleBanners.length)]

  if (banner) {
    dispatch(setBanner(banner, attrs))
  }

  dispatch(toggleLoading(false))
}
