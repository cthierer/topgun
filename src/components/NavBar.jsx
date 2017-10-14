
import React from 'react'
import Link from 'redux-first-router-link'

function NavBar({ items }) {
  return (
    <nav className="navbar flex-center text-heading">
      {items.map(({ label, path }) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link className="nav-link sweep-to-bottom" to={path} key={path}>{label}</Link>
      ))}
    </nav>
  )
}

export default NavBar
