
import React from 'react'
import Article from './Article'
import NavBar from './NavBar'
import { wrapMarkup } from '../utils'
import floralDesign from '../assets/asymmetrical-floral-design-of-spirals.svg'

export default function Collection({
  title,
  description,
  articles,
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
        {hasMultipleArticles && <NavBar items={navLinks} />}
        {hasDescription && <section
          className="lead"
          dangerouslySetInnerHTML={wrapMarkup(description)}
        />}
      </header>
      {(hasMultipleArticles || hasDescription) && <hr className="accent" />}
      <div id="contents">
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
