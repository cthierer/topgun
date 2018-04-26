/* eslint-disable import/no-dynamic-require */

const environment = process.env.NODE_ENV
const { default: config } = require(`./${environment}`)

export default config
