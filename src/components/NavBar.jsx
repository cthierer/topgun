
import React from 'react'
import { NavLink } from 'redux-first-router-link'

function NavBar({
  items,
}) {
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
