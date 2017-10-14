
import React from 'react'
import Link from 'redux-first-router-link'
import { wrapMarkup } from '../utils'

export default function Article({
  title,
  slug,
  contents,
  collection,
  hideTitle = false,
}) {
  const collectionPath = `/${collection}`
  return (
    <section id={slug}>
      {!hideTitle && <h3>{title}</h3>}
      {/* eslint-disable react/no-danger */}
      <div dangerouslySetInnerHTML={wrapMarkup(contents)} />
      {/* eslint-disable react/no-danger */}
      <div className="back-to-top">
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link to={collectionPath}>Back to top</Link>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}
      </div>
      <hr />
    </section>
  )
}
