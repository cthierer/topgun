
import { connect } from 'react-redux'
import GalleryList from '../components/GalleryList'
import { get } from '../utils'

const mapStateToProps = state => ({
  galleries: get(state, 'gallery.galleries', []),
  screenWidth: get(state, 'core.screenWidth'),
})

export default connect(mapStateToProps)(GalleryList)