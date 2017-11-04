
function without(obj, attrs) {
  const keep = Object.keys(obj).filter(attr => !attrs.includes(attr))
  return keep.reduce((last, attr) => ({ ...last, [attr]: obj[attr] }), {})
}

module.exports = function init({
  filePattern = /\.md$/i,
} = {}) {
  return (loaded, metalsmith, done) => {
    const docs = Object
      .values(loaded)
      .filter(({ path }) => filePattern.test(path))
      .reduce((toSave, doc) => {
        const {
          path: originalPath,
          contents,
        } = doc
        const path = originalPath.replace(/\.md$/i, '.json')
        const obj = without(doc, ['next', 'previous', 'stats', 'mode', 'path'])
        const rawContents = Buffer.isBuffer(contents) ? contents.toString('utf8') : contents
        return Object.assign(toSave, {
          [path]: { contents: JSON.stringify({ ...obj, contents: rawContents, path }) },
        })
      }, {})

    Object.assign(loaded, docs)

    done()
  }
}
