
import { connect } from 'react-redux'
import Collection from '../components/Collection'
import { get } from '../utils'
import unloadCollection from '../content/actions/unloadCollection'

const COLLAPSE_AT_WIDTH = 768

const mapStateToProps = state => ({
  title: get(state, 'content.collection.title'),
  description: get(state, 'content.collection.description'),
  articles: get(state, 'content.collection.files', []),
  collapse: get(state, 'core.screenWidth', COLLAPSE_AT_WIDTH + 1) <= COLLAPSE_AT_WIDTH,
  loading: get(state, 'content.loading'),
})

const mapDispatchToProps = dispatch => ({
  unload: () => dispatch(unloadCollection()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
