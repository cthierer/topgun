
import { connect } from 'react-redux'
import Collection from '../components/Collection'

const mapStateToProps = state => ({
  title: state.content.collection.title,
  articles: state.content.collection.files,
})

export default connect(
  mapStateToProps
)(Collection)
