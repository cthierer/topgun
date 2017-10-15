
import React from 'react'
import NavBar from './NavBar'
import { wrapMarkup } from '../utils'
import floralDesign from '../assets/asymmetrical-floral-design-of-spirals.svg'

export default function PageHeader({
  title,
  description,
  navLinks,
  collapse,
}) {
  const hasLinks = navLinks.length > 1
  const hasDescription = !!description

  return (
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
      {hasLinks && <NavBar items={navLinks} menuLabel="Jump to" collapse={collapse} />}
    </header>
  )
}
