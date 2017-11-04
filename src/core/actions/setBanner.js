
export const SET_BANNER = 'SET_BANNER'

export default function setBanner({
  src,
  position = 'center',
  size = 'cover',
}, attrs = {}) {
  return {
    type: SET_BANNER,
    data: {
      src,
      position,
      size,
      ...attrs,
    },
  }
}
