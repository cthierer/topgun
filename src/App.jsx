
import React from 'react'
import { connect } from 'react-redux'
import ContentCollection from './containers/ContentCollection'
import PhotoGalleries from './containers/PhotoGalleries'

/* global document */

function App({
  route,
  title,
  loading,
}) {
  document.title = title

  switch (route) {
    case 'ROUTE_TO_SECTION':
      return <div className={`fade ${loading ? 'loading' : 'loaded'}`}><ContentCollection /></div>
    case 'ROUTE_TO_GALLERIES':
      return <div className={`fade ${loading ? 'loading' : 'loaded'}`}><PhotoGalleries /></div>
    default:
      return <div>Not found</div>
  }
}

const mapStateToProps = state => ({
  route: state.location.type,
  title: state.metadata.title,
  loading: state.core.loading,
})

export default connect(mapStateToProps)(App)
