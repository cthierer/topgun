
import React from 'react'
import Article from './Article'

export default function Page({
  article,
  loading = false,
}) {
  return (
    <article className={`animated with-padding ${loading ? 'loading fadeOutDown' : 'loaded fadeInUp'}`}>
      <div id="contents" className="single">
        <Article {...article} skipBackToTop />
      </div>
    </article>
  )
}
