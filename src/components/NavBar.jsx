
import React from 'react'
import Link from 'redux-first-router-link'

function NavBar({ items }) {
  return (
    <nav className="navbar flex-center text-heading">
      {items.map(({ label, path }, idx) => (
        <Link className="nav-link sweep-to-bottom" to={path} key={idx}>{label}</Link>
      ))}
    </nav>
  )
}

export default NavBar
