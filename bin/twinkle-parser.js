#!/usr/bin/env node
const fs = require('fs')
const Iconv = require('iconv').Iconv
const parse = require('../dist/index.js').default

const iconv = new Iconv('Shift_JIS', 'UTF-8//TRANSLIT//IGNORE')

const filename = process.argv[ 2 ]
if (!filename) {
  console.error('ERROR: Filename is required')
  process.exit(1)
}

const csvData = iconv.convert(fs.readFileSync(filename)).toString()

const result = parse(csvData)

process.stdout.write(JSON.stringify(result))
