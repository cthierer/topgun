
import React from 'react'
import Article from './Article'

export default function Collection({
  title,
  articles,
}) {
  return (
    <article className="with-padding">
      <header className="page-heading">
        <h2 className="flex-center">
          <span className="text-script page-background">
            {title}
          </span>
      </h2>
      </header>
      <hr className="accent" />
      <div id="contents">
        {articles.map(article => <Article key={article.slug} {...article} />)}
      </div>
    </article>
  )
}
