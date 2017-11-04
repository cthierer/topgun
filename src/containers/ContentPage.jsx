
import { connect } from 'react-redux'
import Page from '../components/Page'
import { get } from '../utils'
import unloadPage from '../content/actions/unloadPage'

const mapStateToProps = state => ({
  article: get(state, 'content.page'),
  loading: get(state, 'content.loading'),
})

const mapDispatchToProps = dispatch => ({
  unload: () => dispatch(unloadPage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
