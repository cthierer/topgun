
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
          contents: contents.toString('utf8'),
          description: description.length > 0 ? markdown.render(description) : undefined,
          path,
          key: slugify(title.toLowerCase()),
        }))
        const contentsObj = {
          ...metadata,
          description: description.length > 0 ? markdown.render(description) : undefined,
          files,
        }
        const contents = prettyPrint
          ? JSON.stringify(contentsObj, null, 2)
          : JSON.stringify(contents)
        return { [`${name}.json`]: { contents }}
      })
      .reduce((last, curr) => ({ ...last, ...curr }))

    Object.assign(loaded, collectionFiles)
    done()
  }
}
