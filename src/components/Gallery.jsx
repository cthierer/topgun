
import React from 'react'
import GalleryLibrary from 'react-photo-gallery'
import Lightbox from 'react-images'

class Gallery extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0 }
  }

  render() {
    const {
      title,
      images,
      screenWidth,
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
      <div className="gallery">
        <h3>{title}</h3>
        <GalleryLibrary
          photos={images}
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
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={(screenWidth - 200) || screenWidth}
        />
      </div>
    )
  }
}

export default Gallery
