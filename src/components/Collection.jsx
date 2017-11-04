
import React from 'react'
import Article from './Article'
import PageHeader from './PageHeader'

class Collection extends React.Component {
  componentWillUnmount() {
    this.props.unload()
  }

  render() {
    const {
      title,
      description,
      articles,
      collapse,
      loading,
    } = this.props
    const navLinks = articles.map(({ title: label, path }) => ({ label, path: `/${path}` }))
    const hasMultipleArticles = navLinks.length > 1
    const hasDescription = !!description
    const pageTitle = articles.length === 1
      ? articles[0].title
      : title
    const visible = pageTitle

    if (!visible) {
      return <article className={`animated with-padding ${loading ? 'loading fadeOutDown' : 'loaded fadeInUp'}`} />
    }

    return (
      <article className={`animated with-padding ${loading ? 'loading fadeOutDown' : 'loaded fadeInUp'}`}>
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
              hideTitle={(!hasMultipleArticles && !hasDescription) || article.hideTitle}
              {...article}
            />
          ))}
        </div>
      </article>
    )
  }
}

export default Collection
