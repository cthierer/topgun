
import React from 'react'
import { connect } from 'react-redux'
import ContentCollection from './containers/ContentCollection'
import PhotoGalleries from './containers/PhotoGalleries'

/* global document */

function App({
  route,
  title,
}) {
  document.title = title

  switch (route) {
    case 'ROUTE_TO_SECTION':
      return <ContentCollection />
    case 'ROUTE_TO_GALLERIES':
      return <PhotoGalleries />
    default:
      return <div>Not found</div>
  }
}

const mapStateToProps = state => ({
  route: state.location.type,
  title: state.metadata.title,
})

export default connect(mapStateToProps)(App)
