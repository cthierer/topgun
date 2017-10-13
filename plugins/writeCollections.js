
const path = require('path')
const slugify = require('slugify')

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
        const { description = '', ...metadata } = collection.metadata || {}
        const files = collection.map(({
          title,
          contents,
          description = '',
          path,
        }) => ({
          title,
          contents: Buffer.isBuffer(contents)
            ? contents.toString('utf8')
            : contents,
          description: description.length > 0
            ? markdown.render(description)
            : undefined,
          path,
          slug: slugify(title.toLowerCase()),
        }))
        const contentsObj = {
          ...metadata,
          key: name,
          description: description.length > 0
            ? markdown.render(description)
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
            contents: '',
            description,
            ...metadata,
            collection: [name],
          },
        }
      })
      .reduce((last, curr) => ({ ...last, ...curr }))

    Object.assign(loaded, collectionFiles)
    done()
  }
}
