#!/usr/bin/node

/* eslint-disable import/no-extraneous-dependencies, no-console */

const { readdir, writeFile, copyFile } = require('fs')
const { join } = require('path')
const { promisify } = require('util')
const sizeOf = require('image-size')
const sharp = require('sharp')

const readdirAsync = promisify(readdir)
const writeFileAsync = promisify(writeFile)
const copyFileAsync = promisify(copyFile)
const [,, srcDirectory, outDirectory, cdn] = process.argv

const breakpoints = [576, 768, 992, 1200]

async function processImage(file, src, dest) {
  const [, name, extension] = /([^.]+)\.(jpg)/i.exec(file)

  // copy image
  await copyFileAsync(join(src, file), join(dest, file))

  const { width, height } = sizeOf(join(src, file))
  const isPortrait = height >= width

  const files =
    (await Promise.all(breakpoints.map(async (desired) => {
      const desiredWidth = isPortrait ? null : desired
      const desiredHeight = isPortrait ? desired : null
      const destFile = `${name}_${desired}.${extension}`

      await sharp(join(src, file))
        .resize(desiredWidth, desiredHeight)
        .jpeg({
          quality: 80,
          progressive: true,
        })
        .toFile(join(dest, destFile))

      return { size: desired, img: destFile }
    })))

  return [file, files]
}

async function buildGallery(srcDir, {
  host = '',
  dest = './dest',
}) {
  if (!srcDir) {
    throw new Error('missing srcDir directory')
  }

  const files = await readdirAsync(srcDir)
  const imageFiles = files.filter(file => file.endsWith('.jpg'))

  const images = imageFiles.map(async (file) => {
    const [fullSize, resized] = await processImage(file, srcDir, dest)
    const [{ img: thumbnail }] = resized
    const srcSet = resized.map(({ size, img }) => `${host}/${img} ${size}w`)
    const src = `${host}/${thumbnail}`

    const { width, height } = sizeOf(join(dest, fullSize))

    return {
      src,
      srcSet,
      width,
      height,
      linkTo: `${host}/${fullSize}`,
    }
  })

  return Promise.all(images)
}

buildGallery(srcDirectory, {
  host: cdn,
  dest: outDirectory,
})
  .then(images => writeFileAsync(
    `${outDirectory}/index.json`,
    JSON.stringify(images),
  ))
  .then(() => {
    console.log('done!')
  })
