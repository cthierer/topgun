
import React from 'react'
import Gallery from './Gallery'
import PageHeader from './PageHeader'

const description = `<p>
    Check back later for an opportunity to upload your own photos, and to
    see photos from the wedding.
  </p>`

export default function GalleryList({
  galleries,
  screenWidth,
}) {
  const collapse = screenWidth < 768
  const navLinks = galleries.map(({ title, slug }) => ({
    label: title,
    path: `/galleries/${slug}`,
  }))

  return (
    <div>
      <PageHeader
        title="Photos"
        navLinks={navLinks}
        collapse={collapse}
        description={description}
      />
      {(navLinks.length > 0 || !!description) && <hr className="accent" />}
      <div id="contents" className="galleries">
        {galleries.map(gallery => <Gallery {...gallery} screenWidth={screenWidth} />)}
      </div>
    </div>
  )
}