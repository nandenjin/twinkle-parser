import fs from 'fs'
import path from 'path'
import parseArgs from 'minimist'
import consola from 'consola'
import iconv from 'iconv-lite'
import { default as parse, FIELD_KEYS, KDBCourse } from '.'
import { repairCSV } from './util/csv'

export interface CLIOutput {
  [key: string]: Partial<KDBCourse>
}

interface PackageJSON {
  version: string
}

export default function (pkg: PackageJSON, _argv: string[]): number {
  const argv = parseArgs(_argv.slice(2))

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
    return 0
  } else if (argv.v || argv.version) {
    consola.log('v' + pkg.version)
    return 0
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
      return 1
    }
  }

  // Output filepath
  const outPath = argv.o || argv.out

  if (!filename) {
    consola.fatal('Filename is required')
    consola.info('Add -h / --help option to see usage')
    return 1
  }

  let csvData = iconv
    .decode(fs.readFileSync(filename), 'Shift_JIS')
    .replace(/\s+$/gm, '')

  if (csvData.match(/^\s*"/)) {
    csvData = repairCSV(csvData)
  } else {
    consola.warn(
      'Unexpected CSV format. Some optional steps may be skipped (ex: CSV repairment)'
    )
  }

  const parsed = parse(csvData)
  const result: CLIOutput = {}

  for (const id in parsed) {
    result[id] = parsed[id]

    for (const key in parsed[id]) {
      if (!fields.includes(key)) {
        delete result[id][key as keyof KDBCourse]
      }
    }
  }

  const outputJSON = JSON.stringify(result, null, prettyFlag ? 2 : 0)

  if (outPath) {
    fs.writeFileSync(path.resolve(outPath), outputJSON)
  } else {
    process.stdout.write(outputJSON)
  }

  return 0
}
