
/* eslint-disable no-console */

const Metalsmith = require('metalsmith')
const markdownIt = require('metalsmith-markdownit')
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const publish = require('metalsmith-publish')
const inlineSource = require('metalsmith-inline-source')
const collections = require('metalsmith-collections')
const defaultValues = require('metalsmith-default-values')
const metadata = require('metalsmith-metadata')
const ignore = require('metalsmith-ignore')
const sitemap = require('metalsmith-sitemap')
const chalk = require('chalk')
const moment = require('moment')
const webpack = require('./plugins/webpack')
const writeCollections = require('./plugins/writeCollections')
const toJSON = require('./plugins/toJSON')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'develop'
const webpackConfig = require(`./webpack.${env}.js`) // eslint-disable-line import/no-dynamic-require

const markdown = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

markdown.parser.use(require('markdown-it-classy'))

console.log(chalk.bold.green('starting metalsmith build...'))

Metalsmith(__dirname)
  .metadata({
    sitename: 'Lindsay & Thomas\'s Wedding',
    description: 'Lindsay Southworth and Thomas Clingan will be getting married on May 12, 2018. Read their story, find directions to the ceremony, book a hotel room, and send them a gift.',
    siteheader: 'Lindsay & Thomas',
    eventdate: moment('2018-05-12'),
    hashtags: ['#Stage5Clingan'],
  })
  .source('./content')
  .destination('./public')
  .clean(true)
  .use(defaultValues([
    {
      pattern: '**/*.md',
      defaults: {
        title: 'Lindsay & Thomas\'s Wedding',
        description: 'Lindsay Southworth and Thomas Clingan will be getting married on May 12, 2018. Read their story, find directions to the ceremony, book a hotel room, and send them a gift.',
        collection: [],
        path: '/',
      },
    },
  ]))
  .use(publish({
    draft: env !== 'production',
    develop: env === 'development',
  }))
  .use(metadata({
    navigation: '_data/navigation.yml',
    banners: '_data/banners.yml',
  }))
  .use(ignore([
    '**/_*.*',
    '**/[^_headers]',
  ]))
  .use(collections({
    about: {
      pattern: 'about/**/*.md',
      metadata: 'content/about/_collection.yml',
    },
    accommodations: {
      pattern: 'accommodations/**/*.md',
      metadata: 'content/accommodations/_collection.yml',
    },
    'our-day': {
      pattern: 'our-day/**/*.md',
      metadata: 'content/our-day/_collection.yml',
      sortBy: 'order',
    },
    registry: {
      pattern: 'registry/**/*.md',
      metadata: 'content/registry/_collection.yml',
    },
  }))
  .use(markdown)
  .use(toJSON())
  .use(permalinks())
  .use(writeCollections({
    prettyPrint: process.env.NODE_ENV !== 'production',
    markdown: markdown.parser,
  }))
  .use(webpack(webpackConfig))
  .use(layouts({
    engine: 'ejs',
    default: 'default.html',
    directory: './layouts',
    pattern: '**/*.html',
    urlProperty: 'permalink',
  }))
  .use(inlineSource())
  .use(sitemap({
    hostname: 'https://www.stage5clingan.com',
    omitExtension: true,
    omitIndex: true,
  }))
  .build((err, files) => {
    if (err) {
      throw err
    }

    const numFiles = Object.keys(files).length
    console.log(chalk.bold.green(`...metalsmith done! built ${numFiles} files.`))
  })
