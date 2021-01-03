#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const parseArgs = require('minimist')
const iconv = require('iconv-lite')
const parse = require('../dist/index.js').default

const argv = parseArgs(process.argv.slice(2))

// * Help
if (argv.h || argv.help) {
  console.log(
    `* twinkle-parser
Usage: twinkle-parser PATH_TO_SOURCE_CSV

Options:
-o FILENAME / --out FILENAME : Export JSON to specified file
-p / --pretty : Prettify output
-h / --help : See this help
`
  )
  process.exit(0)
}

// Input filename
const filename = argv._[0]

// Prettify flag
const prettyFlag = argv.p || argv.pretty

// Output filepath
const outPath = argv.o || argv.out

if (!filename) {
  console.error('ERROR: Filename is required')
  console.error('Add -h / --help option to see usage')
  process.exit(1)
}

const csvData = iconv
  .decode(fs.readFileSync(filename), 'Shift_JIS')
  .replace(/\s+$/gm, '')

const result = parse(csvData)
const outputJSON = JSON.stringify(result, null, prettyFlag ? 2 : 0)

if (outPath) {
  fs.writeFileSync(path.resolve(outPath), outputJSON)
} else {
  process.stdout.write(outputJSON)
}
