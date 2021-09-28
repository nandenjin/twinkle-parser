#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const pkg = require('../package.json')
const code = require('../dist/cli.js').default(pkg, process.argv)
process.exit(code)
