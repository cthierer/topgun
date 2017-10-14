
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import { get } from '../utils'

const COLLAPSE_AT_WIDTH = 768

const mapStateToProps = state => ({
  items: get(state, 'navigation'),
  currPath: get(state, 'location.pathname'),
  collapse: get(state, 'core.screenWidth', COLLAPSE_AT_WIDTH + 1) <= COLLAPSE_AT_WIDTH,
})

export default connect(mapStateToProps)(NavBar)
