
import React from 'react'
import { NavLink } from 'redux-first-router-link'
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/react-accessible-accordion.css'

function generateLinks(links) {
  return links.map(({
    label,
    path,
    href,
    target,
  }) => {
    if (href) {
      return <a className="nav-link sweep-to-bottom" href={href} target={target}>{label}</a>
    }
    return (
      <NavLink
        className="nav-link sweep-to-bottom"
        to={path}
        key={path}
        activeClassName="active"
        onClick={(e) => {
          e.target.blur()
        }}
      >
        {label}
      </NavLink>
    )
  })
}

function NavBar({
  items,
  currPath,
  collapse = false,
  menuLabel = 'Navigation',
}) {
  if (collapse) {
    const {
      label: title = menuLabel,
    } = items.find(({ path }) => currPath && currPath.startsWith(path)) || {}
    const links = generateLinks([
      ...items.filter(({ path }) => !currPath || (path && !currPath.startsWith(path))),
      ...items.filter(({ href }) => !!href),
    ])

    return (
      <nav className="navbar text-heading collapse">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="nav-link active nav-dropdown">
              {title}
            </AccordionItemTitle>
            <AccordionItemBody>
              {links}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </nav>
    )
  }

  const links = generateLinks(items)

  return (
    <nav className="navbar flex-center text-heading">
      {links}
    </nav>
  )
}

export default NavBar
