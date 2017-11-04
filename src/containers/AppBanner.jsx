
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { get } from '../utils'

const mapStateToProps = (state) => {
  const { location: { kind } = {} } = state
  const defaultSrc = kind === 'load' ? '' : '/assets/banners/24.jpg'

  return {
    src: get(state, 'core.banner.src', defaultSrc),
    position: get(state, 'core.banner.position', 'center'),
    size: get(state, 'core.banner.size', 'cover'),
    loading: get(state, 'core.loading'),
  }
}

export default connect(mapStateToProps)(Banner)
