
import React from 'react'
import Article from './Article'
import NavBar from './NavBar'
import { wrapMarkup } from '../utils'
import floralDesign from '../assets/asymmetrical-floral-design-of-spirals.svg'

export default function Collection({
  title,
  description,
  articles,
  collapse,
}) {
  const navLinks = articles.map(({ title: label, path }) => ({ label, path: `/${path}` }))
  const hasMultipleArticles = navLinks.length > 1
  const hasDescription = !!description

  return (
    <article className="with-padding">
      <header className="page-heading">
        <h2 className="flex-center">
          <hr className="accent behind" />
          <img className="page-background decorate-text left" src={floralDesign} alt="" />
          <span className="text-script page-background section-title">
            {title}
          </span>
          <img className="page-background decorate-text right" src={floralDesign} alt="" />
        </h2>
        {/* eslint-disable react/no-danger */}
        {hasDescription && <section
          className="lead"
          dangerouslySetInnerHTML={wrapMarkup(description)}
        />}
        {/* eslint-enable react/no-danger */}
        {hasMultipleArticles && <NavBar items={navLinks} menuLabel="Jump to" collapse={collapse} />}
      </header>
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
