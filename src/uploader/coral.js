
import config from '../config'

/* global document window */

const host = config.baseUri.coral

const clientPr = new Promise((resolve, reject) => {
  if (window.coral) {
    resolve(window.coral)
    return
  }

  const script = document.createElement('script')

  script.src = config.coralClient
  script.onload = function clientLoaded() {
    if (window.coral) {
      resolve(window.coral)
      return
    }

    reject(new Error('unable to load coral client'))
  }
  script.onerror = reject

  document.body.appendChild(script)
})

export async function upload(...args) {
  const client = await clientPr
  return client.upload(...args, { host })
}

export async function publish(...args) {
  const client = await clientPr
  return client.publish(...args, { host })
}
