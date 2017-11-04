
const path = require('path')

function getFileName(filePath) {
  const [, fileName] = /\/(.+)$/i.exec(filePath)
  return fileName
}

function getPath(basePath, filePath) {
  if (!basePath) {
    return filePath
  }

  const fileName = getFileName(filePath)
  return path.posix.join(basePath, fileName)
}

module.exports = function init({
  prettyPrint = false,
  markdown = { render: str => str },
} = {}) {
  return (loaded, metalsmith, done) => {
    const { collections = {} } = metalsmith.metadata()
    const collectionFiles = Object
      .keys(collections)
      .map((name) => {
        const collection = collections[name]
        const {
          description: collectionDescription = '',
          permalink = name,
          ...metadata
        } = collection.metadata || {}
        const files = collection.map(({
          title,
          contents,
          description = '',
          path: filePath,
          skipBackToTop,
          hideTitle,
        }) => ({
          title,
          contents: Buffer.isBuffer(contents)
            ? contents.toString('utf8')
            : contents,
          description: description.length > 0
            ? markdown.render(description)
            : undefined,
          path: getPath(permalink, filePath),
          slug: getFileName(filePath),
          collection: name,
          skipBackToTop,
          hideTitle,
        }))
        const contentsObj = {
          ...metadata,
          key: name,
          description: collectionDescription.length > 0
            ? markdown.render(collectionDescription)
            : undefined,
          files,
        }
        const contents = prettyPrint
          ? JSON.stringify(contentsObj, null, 2)
          : JSON.stringify(contentsObj)


        metalsmith.metadata().collections[name] = contentsObj

        return {
          [`${name}.json`]: {
            contents,
          },
          [`${path.join(name, 'index.html')}`]: {
            ...contentsObj,
            contents: '',
            collection: [name],
            path: name,
          },
        }
      })
      .reduce((last, curr) => ({ ...last, ...curr }))

    Object.assign(loaded, collectionFiles)
    done()
  }
}
