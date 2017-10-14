
import React from 'react'

export default function Banner({
  src,
  size = 'cover',
  position = 'center',
}) {
  if (src) {
    const styles = {
      'background-image': `url('${src}')`,
      'background-size': size,
      'background-position': position,
    }

    return (
      <div className="site-banner" style={styles}>
        <div className="inner-shadow" />
      </div>
    )
  }
}
