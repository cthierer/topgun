#!/usr/bin/node

/* eslint-disable import/no-extraneous-dependencies, no-console */

const { readdir, writeFile } = require('fs')
const { promisify } = require('util')
const sizeOf = require('image-size')

const readdirAsync = promisify(readdir)
const writeFileAsync = promisify(writeFile)
const [,, albumDirectory, cdn] = process.argv

async function buildManifest(src, {
  host = '',
}) {
  if (!src) {
    throw new Error('missing src directory')
  }

  const files = await readdirAsync(src)
  const imageFiles = files.filter(file => !file.endsWith('_thumb.jpg'))
  const images = imageFiles.map((file) => {
    const [, name, extension] = /([^.]+)\.(jpg)/i.exec(file)
    const thumbnail = `${name}_thumb.${extension}`
    const dimensions = sizeOf(`${src}/${thumbnail}`)

    return {
      src: `${host}/${thumbnail}`,
      linkTo: `${host}/${file}`,
      width: dimensions.width,
      height: dimensions.height,
    }
  })

  return images
}

buildManifest(albumDirectory, {
  host: cdn,
})
  .then(images => writeFileAsync(
    `${albumDirectory}/manifest.json`,
    JSON.stringify(images),
  ))
  .then(() => {
    console.log('done!')
  })
