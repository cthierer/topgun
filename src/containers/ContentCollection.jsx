
import { connect } from 'react-redux'
import Collection from '../components/Collection'
import { get } from '../utils'

const mapStateToProps = state => ({
  title: get(state, 'content.collection.title'),
  articles: get(state, 'content.collection.files', []),
})

export default connect(
  mapStateToProps
)(Collection)
