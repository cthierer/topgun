
import React from 'react'
import GalleryLibrary from 'react-photo-gallery'
import Lightbox from 'react-images'
import Link from 'redux-first-router-link'
import Uploader from './Uploader'

/* global window */

function openImage({ linkTo }) {
  if (linkTo) window.open(linkTo)
}

class Gallery extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0 }
  }

  render() {
    const {
      title,
      slug,
      images,
      screenWidth,
      skipBackToTop = true,
      writeable = false,
      finishUpload,
      startUpload,
      handleUploadError,
      uploads = [],
    } = this.props

    let numColumns

    if (screenWidth < 576) {
      numColumns = 1
    } else if (screenWidth < 768) {
      numColumns = 2
    } else if (screenWidth < 1200) {
      numColumns = 3
    } else {
      numColumns = 4
    }

    return (
      <div className="gallery" id={slug}>
        <h3>{title}</h3>
        {writeable && <Uploader
          gallery={slug}
          finishUpload={finishUpload}
          startUpload={startUpload}
          handleUploadError={handleUploadError}
          uploads={uploads}
        />}
        <GalleryLibrary
          photos={images.map(({ linkTo: _linkTo, ...img }) => img)}
          onClick={(e, { index }) => this.setState({ currentImage: index, lightboxIsOpen: true })}
          columns={numColumns}
        />
        <Lightbox
          theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
          images={
            images.map(({
              srcSet: srcset,
              title: caption,
              linkTo: src,
              ...img
            } = {}) => ({
              ...img,
              src,
              srcset,
              caption,
            }))
          }
          backdropClosesModal
          onClose={() => this.setState({ currentImage: 0, lightboxIsOpen: false })}
          onClickPrev={() => this.setState({ currentImage: this.state.currentImage - 1 })}
          onClickNext={() => this.setState({ currentImage: this.state.currentImage + 1 })}
          onClickImage={() => openImage(this.props.images[this.state.currentImage])}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
        {!skipBackToTop &&
          <div className="back-to-top">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <Link to="/photos">Back to top</Link>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
          </div>
        }
        <hr />
      </div>
    )
  }
}

export default Gallery
