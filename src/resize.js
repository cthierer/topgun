
import resizeScreen from './core/actions/resizeScreen'

function throttle(fn, timeout = 66) {
  let throttled
  return () => {
    if (!throttled) {
      throttled = setTimeout(() => {
        throttled = null
        fn()
      }, timeout)
    }
  }
}

export default function handleResize({ dispatch }) {
  return throttle(() => dispatch(resizeScreen()))
}
