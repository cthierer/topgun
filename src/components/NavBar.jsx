
import React from 'react'
import { NavLink } from 'redux-first-router-link'
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/react-accessible-accordion.css'

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
    const showItems = items.filter(({ path }) => !currPath || !currPath.startsWith(path))

    return (
      <nav className="navbar text-heading collapse">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="nav-link active nav-dropdown">
              {title}
            </AccordionItemTitle>
            <AccordionItemBody>
              {showItems.map(({ label, path }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
              ))}
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </nav>
    )
  }

  return (
    <nav className="navbar flex-center text-heading">
      {items.map(({ label, path }) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
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
      ))}
    </nav>
  )
}

export default NavBar
