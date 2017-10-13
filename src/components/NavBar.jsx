
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-first-router-link'

function NavBar({ items }) {
  return (
    <div className='flex-center'>
      {items.map(({ label, path }, idx) =>
        <Link className='nav-link sweep-to-bottom' to={path} key={idx}>{label}</Link>)}
    </div>
  )
}

NavBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default NavBar
