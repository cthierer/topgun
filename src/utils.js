
import curry from 'lodash.curry'

// eslint-disable-next-line import/prefer-default-export
export const get = curry((
  obj,
  path,
  defaultVal = null,
) => path.split('.').reduce((ref, attr) => ref && ref[attr], obj) || defaultVal)
