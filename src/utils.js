
import curry from 'lodash.curry'

export const get = curry((
  obj,
  path,
  defaultVal = null,
) => path.split('.').reduce((ref, attr) => ref && ref[attr], obj) || defaultVal)

export const wrapMarkup = markup => ({ __html: markup })

export const getRandom = max => Math.floor(Math.random() * max)

export const sleep = async length => new Promise(resolve => setTimeout(resolve, length))
