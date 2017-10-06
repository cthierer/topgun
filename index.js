
const Metalsmith = require('metalsmith')
const markdownIt = require('metalsmith-markdownit')
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const publish = require('metalsmith-publish')
const chalk = require('chalk')
const webpack = require('./plugins/webpack')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'develop'
const webpackConfig = require(`./webpack.${env}.js`)

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

markdown.parser.use(require('markdown-it-classy'))

console.log(chalk.bold.green('starting metalsmith build...'))

Metalsmith(__dirname)
  .source('./content')
  .destination('./public')
  .clean(true)
  .use(publish({
    draft: env !== 'production'
  }))
  .use(markdown)
  .use(permalinks())
  .use(webpack(webpackConfig))
  .use(layouts({
    engine: 'ejs',
    default: 'default.html',
    directory: './layouts',
  }))
  .build((err, files) => {
    if (err) {
      throw err
    }

    const numFiles = Object.keys(files).length
    console.log(chalk.bold.green(`...metalsmith done! built ${numFiles} files.`))
  })
