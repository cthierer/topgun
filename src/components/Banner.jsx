
import React from 'react'
import curry from 'lodash.curry'

const getAttrForScreen = curry((attr, width) => {
  if (typeof attr === 'string') {
    return attr
  }

  const widths = Object
    .keys(attr)
    .map(val => Number.parseInt(val, 10))
    .sort()

  const cutoff = widths.find(val => width <= val) || widths[0]
  return attr[cutoff]
})

export default function Banner({
  src,
  size = 'cover',
  position = 'center',
}) {
  if (src) {
    const getSrc = getAttrForScreen(src)
    const getSize = getAttrForScreen(size)
    const getPosition = getAttrForScreen(position)

    return (
      <div className="site-banner-wrapper">
        <div className="site-banner outer" />
        <div className="site-banner inner">
          <div className="inner-shadow" />
        </div>
        { /* eslint-disable react/jsx-closing-tag-location */ }
        <style scoped>{`
          .site-banner {
            background-image: url('${getSrc(0)}');
            background-size: ${getSize(0)};
            background-position: ${getPosition(0)};
          }

          @media (min-width: 576px) {
            .site-banner {
              background-image: url('${getSrc(576)}');
              background-size: ${getSize(576)};
              background-position: ${getPosition(576)};
            }
          }

          @media (min-width: 768px) {
            .site-banner {
              background-image: url('${getSrc(768)}');
              background-size: ${getSize(768)};
              background-position: ${getPosition(768)};
            }
          }

          @media (min-width: 992px) {
            .site-banner {
              background-image: url('${getSrc(992)}');
              background-size: ${getSize(992)};
              background-position: ${getPosition(992)};
            }
          }

          @media (min-width: 1200px) {
            .site-banner {
              background-image: url('${getSrc(1200)}');
              background-size: ${getSize(1200)};
              background-position: ${getPosition(1200)};
            }
          }
        `}</style>
        { /* eslint-enable react/jsx-closing-tag-location */ }
      </div>
    )
  }
}
