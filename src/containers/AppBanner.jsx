
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { get } from '../utils'

const mapStateToProps = state => ({
  src: get(state, 'core.banner.src', '/assets/banners/24.jpg'),
  position: get(state, 'core.banner.size', 'center'),
  size: get(state, 'core.banner.cover', 'cover'),
})

export default connect(mapStateToProps)(Banner)
