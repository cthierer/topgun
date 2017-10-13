
import React from 'react'

const wrapMarkup = markup => ({ __html: markup })

export default function Article({
  title,
  slug,
  contents,
}) {
  return (
    <section id={slug}>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={wrapMarkup(contents)}></div>
      <div className="back-to-top">
        <a href="#">
          Back to top
        </a>
      </div>
      <hr />
    </section>
  )
}
