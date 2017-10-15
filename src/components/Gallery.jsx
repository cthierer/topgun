
import React from 'react'
import GalleryLibrary from 'react-photo-gallery'

/* global window */

function openImage(e, { photo: { linkTo } }) {
  window.open(linkTo)
}

export default function Gallery({
  title,
  images,
  screenWidth,
}) {
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
      <GalleryLibrary photos={images} onClick={openImage} columns={numColumns} />
    </div>
  )
}
