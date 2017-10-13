
import React from 'react'
import { wrapMarkup } from '../utils'

export default function Article({
  title,
  slug,
  contents,
  hideTitle = false,
}) {
  return (
    <section id={slug}>
      {!hideTitle && <h3>{title}</h3>}
      <div dangerouslySetInnerHTML={wrapMarkup(contents)} />
      <div className="back-to-top">
        <a href="#">
          Back to top
        </a>
      </div>
      <hr />
    </section>
  )
}
