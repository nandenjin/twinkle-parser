#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')
const parseArgs = require('minimist')
const consola = require('consola')
const iconv = require('iconv-lite')
const { default: parse, FIELD_KEYS } = require('../dist/index.js')

const argv = parseArgs(process.argv.slice(2))

// * Help
if (argv.h || argv.help) {
  consola.log(
    `* twinkle-parser
Usage: twinkle-parser PATH_TO_SOURCE_CSV

Options:
-o FILENAME / --out FILENAME : Export JSON to specified file
-p / --pretty : Prettify output
--fields : Fields to be included (comma-separated, specifing all if not set)
-h / --help : See this help
-v / --version : Print version info
`
  )
  process.exit(0)
}

else if (argv.v || argv.version) {
  consola.log('v' + process.env.npm_package_version)
  process.exit(0)
}

// Input filename
const filename = argv._[0]

// Prettify flag
const prettyFlag = argv.p || argv.pretty

const fields = argv.fields ? argv.fields.split(',') : FIELD_KEYS

for (const key of fields) {
  if (!FIELD_KEYS.includes(key)) {
    consola.error(`Unknown field "${key}"`)
    consola.info(`Supported fields: ${FIELD_KEYS.join(',')}`)
    process.exit(1)
  }
}

// Output filepath
const outPath = argv.o || argv.out

if (!filename) {
  consola.fatal('Filename is required')
  consola.info('Add -h / --help option to see usage')
  process.exit(1)
}

const csvData = iconv
  .decode(fs.readFileSync(filename), 'Shift_JIS')
  .replace(/\s+$/gm, '')

const parsed = parse(csvData)
const result = {}

for (const id in parsed) {
  result[id] = {}

  for (const key in parsed[id]) {
    if (fields.includes(key)) {
      result[id][key] = parsed[id][key]
    }
  }
}

const outputJSON = JSON.stringify(result, null, prettyFlag ? 2 : 0)

if (outPath) {
  fs.writeFileSync(path.resolve(outPath), outputJSON)
} else {
  process.stdout.write(outputJSON)
}
