
export const SET_BANNER = 'SET_BANNER'

export default function setBanner({
  src,
  position = 'center',
  size = 'cover',
}) {
  return {
    type: SET_BANNER,
    data: { src, position, size },
  }
}
