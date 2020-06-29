import csvParse from 'csv-parse/lib/sync'

// Import data types
import { KDBData, KDBCourse } from '../types'

// Import utils
import * as arrayUtil from './util/array'

// Export data types
export { KDBData, KDBCourse }

/**
 * Parse csv string to structured KDBData
 * @param csvData
 */
export default function parse(csvData: string): KDBData {
  const output: KDBData = {}

  const data = csvParse(csvData)

  const exceptions: {
    term: string[]
    period: number[]
  } = {
    term: [],
    period: [],
  }

  const DAYS_STR_INDEX = ['日', '月', '火', '水', '木', '金', '土']

  data.forEach((r: string[]) => {
    const id = r[0]
    const title = r[1]

    const termStr = r[5]
    let terms: number[] = []

    const periodStr = r[6]
    let periods: number[][][] = []

    let rooms = r[7].split(/[,\s]/)

    // NOTE: instructors cannot be splitted with \s because it matches
    // separators of First name and Family name.
    let instructors = r[8].split(/[,\n]/)

    const overview = r[9]
    const remarks = r[10]

    termStr.split('\n').forEach((term, i, self) => {
      if (term.match(/^(春|秋)([ABC]+)(.*)$/)) {
        const season = RegExp.$1
        const mod = RegExp.$2
        const tail = RegExp.$3

        const termStartIndex = season === '春' ? 0 : 3

        if (mod.match(/A/)) {
          terms.push(termStartIndex + 0)
        }
        if (mod.match(/B/)) {
          terms.push(termStartIndex + 1)
        }
        if (mod.match(/C/)) {
          terms.push(termStartIndex + 2)
        }

        // In case termStr does not delimitered correctry
        if (tail.length > 0) {
          self.splice(i + 1, 0, tail)
        }
      } else if (!exceptions.term.includes(term)) {
        exceptions.term.push(term)
      }
    })

    periodStr.split('\n').forEach(period => {
      ;(period.match(/([月火水木金土日・]+)([1-6,-]+)/g) || []).forEach(() => {
        const dayStr = RegExp.$1
        const perStr = RegExp.$2

        const ds = (dayStr.match(/[月火水木金土日]/g) || []).map(d =>
          DAYS_STR_INDEX.indexOf(d)
        )
        const ps = []

        let pstr = perStr

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (pstr.match(/^,?([1-6])-([1-6]),?/)) {
            const s = +RegExp.$1 - 1
            const e = +RegExp.$2 - 1

            if (s <= e) {
              for (let i = s; i <= e; i++) {
                ps.push(i)
              }
            }

            pstr = pstr.replace(new RegExp(`^${RegExp.lastMatch}`), '')
          } else if (pstr.match(/^,?([1-6]),?/)) {
            const p = +RegExp.$1 - 1
            ps.push(p)

            pstr = pstr.replace(new RegExp(`^${RegExp.lastMatch}`), '')
          } else {
            break
          }
        }

        ds.sort()
        ps.sort()

        periods.push([ds, ps])
      })
    })

    // Normalization
    // Concat consequtive period expressions
    for (let i = 0; i < periods.length; i++) {
      const a = periods[i]
      for (let j = i + 1; j < periods.length; j++) {
        const b = periods[j]
        if (arrayUtil.isEqual(a[0], b[0])) {
          const union = arrayUtil.union(a[1], b[1])
          if (arrayUtil.isConsecutiveN(union)) {
            a[1] = union
            periods.splice(j, 1)
          }
        }
      }
    }

    // Remove duplications
    terms = arrayUtil.removeDuplication(terms)
    periods = arrayUtil.removeDuplication(periods)
    rooms = arrayUtil.removeDuplication(rooms)

    // Remove empty string
    rooms = rooms.filter(room => !room.match(/^\s*$/))
    instructors = instructors.filter(room => !room.match(/^\s*$/))

    output[id] = {
      title,
      termStr,
      terms,

      periodStr,
      periods,

      rooms,
      instructors,

      overview,
      remarks,
    }
  })

  return output
}
