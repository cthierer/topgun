
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'

const mapStateToProps = state => ({
  items: state.navigation,
})

export default connect(
  mapStateToProps,
)(NavBar)
