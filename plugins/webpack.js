
const webpack = require('webpack')
const chalk = require('chalk')

module.exports = function init(config) {
  const compiler = webpack(config)
  console.log(chalk.bold.green('compiling webpack assets...\n'))

  return (files, metalsmith, done) => {

    compiler.run((err, stats) => {
      if (err) {
        throw err
      }

      console.log(stats.toString({
        children: false,
        chunk: false,
        colors: true,
        modules: false,
      }))

      if (stats.hasErrors()) {
        throw new Error('webpack compilation encountered an error')
      }

      const { publicPath, assets } = stats.toJson()
      const scripts = assets
        .filter(({ name }) => /\.js$/i.test(name))
        .map(({ name }) => `${publicPath}${name}`)
      const styles = assets
        .filter(({ name }) => /\.css$/i.test(name))
        .map(({ name }) => `${publicPath}${name}`)

      Object.keys(files).forEach((fileName) => {
        const file = files[fileName]
        file.inject = { scripts, styles }
      })

      console.log(chalk.bold.green('\n...webpack done!'))
      done()
    })
  }
}
