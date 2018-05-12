
import { connect } from 'react-redux'
import GalleryList from '../components/GalleryList'
import { get } from '../utils'
import {
  finishUpload,
  startUpload,
  notifyError as handleUploadError,
} from '../uploader/actions'

const mapStateToProps = state => ({
  galleries: get(state, 'gallery.galleries', []),
  screenWidth: get(state, 'core.screenWidth'),
  loading: get(state, 'gallery.loading'),
  uploads: get(state, 'uploader'),
})

const mapDispatchToProps = {
  finishUpload,
  startUpload,
  handleUploadError,
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList)
