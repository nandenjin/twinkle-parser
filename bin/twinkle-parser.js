#!/usr/bin/env node
const fs = require('fs')
const parseArgs = require('minimist')
const Iconv = require('iconv').Iconv
const parse = require('../dist/index.js').default

const iconv = new Iconv('Shift_JIS', 'UTF-8//TRANSLIT//IGNORE')
const argv = parseArgs(process.argv.slice(2))

// * Help
if (argv.h || argv.help) {
  console.log(
    `* twinkle-parser
Usage: twinkle-parser PATH_TO_SOURCE_CSV

Options:
-h / --help : See this help
`
  )
  process.exit(0)
}

const filename = argv._[0]
if (!filename) {
  console.error('ERROR: Filename is required')
  console.error('Add -h / --help option to see usage')
  process.exit(1)
}

const csvData = iconv.convert(fs.readFileSync(filename)).toString()

const result = parse(csvData)

process.stdout.write(JSON.stringify(result))
