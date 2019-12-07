#! /usr/bin/env node

const path = require('path')

const searchAndReplace = require('./index.js')


if (!process.argv[2] || !process.argv[3]) {
  const commandName = __filename.replace(__dirname + '/', '')
  console.info(`Usage: ${commandName} <tsv-file> <text-file>`)
}
else {
  searchAndReplace(
    path.resolve(process.argv[2]),
    path.resolve(process.argv[3])
  )
}
