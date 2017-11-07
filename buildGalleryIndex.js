#!/usr/bin/node

/* eslint-disable import/no-extraneous-dependencies, no-console */

const { readdir, writeFile, stat } = require('fs')
const { join } = require('path')
const { promisify } = require('util')

const readdirAsync = promisify(readdir)
const writeFileAsync = promisify(writeFile)
const statAsync = promisify(stat)
const [,, srcDirectory, cdn] = process.argv

const ALBUM_TITLES = new Map([
  ['engagement', 'Engagement'],
])

async function buildIndex(srcDir, {
  host = '',
}) {
  if (!srcDir) {
    throw new Error('missing srcDir directory')
  }

  const files = await readdirAsync(srcDir)
  const stats = await Promise.all(files.map(async (file) => {
    const result = await statAsync(join(srcDir, file))
    return { file, stats: result }
  }))
  const galleries = stats
    .filter(({ stats: file }) => file.isDirectory())
    .map(({ file }) => {
      const title = ALBUM_TITLES.has(file) ? ALBUM_TITLES.get(file) : file
      return {
        slug: file,
        path: `${host}/${file}`,
        title,
      }
    })

  return galleries
}

buildIndex(srcDirectory, {
  host: cdn,
})
  .then(galleries => writeFileAsync(
    `${srcDirectory}/index.json`,
    JSON.stringify(galleries),
  ))
  .then(() => {
    console.log('done!')
  })
