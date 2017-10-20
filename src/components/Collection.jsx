
import React from 'react'
import Article from './Article'
import PageHeader from './PageHeader'

export default function Collection({
  title,
  description,
  articles,
  collapse,
}) {
  const navLinks = articles.map(({ title: label, path }) => ({ label, path: `/${path}` }))
  const hasMultipleArticles = navLinks.length > 1
  const hasDescription = !!description
  const pageTitle = articles.length === 1
    ? articles[0].title
    : title

  return (
    <article className="with-padding">
      <PageHeader
        title={pageTitle}
        description={description}
        navLinks={navLinks}
        collapse={collapse}
      />
      {(hasMultipleArticles || hasDescription) && <hr className="accent" />}
      <div id="contents" className={hasMultipleArticles ? 'articles' : 'single'}>
        {articles.map(article => (
          <Article
            key={article.slug}
            hideTitle={!hasMultipleArticles && !hasDescription}
            {...article}
          />
        ))}
      </div>
    </article>
  )
}
