
import React from 'react'
import { connect } from 'react-redux'
import ContentCollection from './containers/ContentCollection'

function App({
  route,
}) {
  switch (route) {
    case 'ROUTE_TO_SECTION':
      return <ContentCollection />
    default:
      return <div>Not found</div>
  }
}

const mapStateToProps = state => ({
  route: state.location.type,
})

export default connect(
  mapStateToProps,
)(App)
