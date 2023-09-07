import { parse as parseCSV } from 'csv-parse/sync'

/**
 * Parsed fields of a row
 */
export type ParsedRow = {
  courseNumber: string
  courseName: string
  instructionalType: string
  credits: string
  standardRegistrationYear: string
  term: string
  period: string
  classroom: string
  instructor: string
  courseOverview: string
  remarks: string
  statusForAuditor: string
  statusForExchangeStudent: string
  updatedAt: string
}

type Key = keyof ParsedRow

/**
 * Parse CSV string and return rows. The first row should be header.
 * @param csvString CSV string from KdB
 * @returns Parsed rows
 */
export function getRowsFromCSV(csvString: string): Partial<ParsedRow>[] {
  const data = parseCSV(csvString) as string[][]

  if (data.length === 0 || data[0].length === 0) {
    throw new Error('csvString does not contain any data')
  }

  const headerKeys: (Key | null)[] = []

  for (const key of data[0]) {
    switch (key) {
      case '科目番号':
        headerKeys.push('courseNumber')
        break
      case '科目名':
        headerKeys.push('courseName')
        break
      case '授業方法':
        headerKeys.push('instructionalType')
        break
      case '単位数':
        headerKeys.push('credits')
        break
      case '標準履修年次':
        headerKeys.push('standardRegistrationYear')
        break
      case '実施学期':
        headerKeys.push('term')
        break
      case '曜時限':
        headerKeys.push('period')
        break
      case '教室':
        headerKeys.push('classroom')
        break
      case '担当教員':
        headerKeys.push('instructor')
        break
      case '授業概要':
        headerKeys.push('courseOverview')
        break
      case '備考':
        headerKeys.push('remarks')
        break
      case '科目等履修生申請可否':
        headerKeys.push('statusForAuditor')
        break
      case '短期留学生申請可否':
        headerKeys.push('statusForExchangeStudent')
        break
      case 'データ更新日':
        headerKeys.push('updatedAt')
        break
      default:
        headerKeys.push(null)
    }
  }

  if (headerKeys.every(key => key === null)) {
    throw new Error('No field is found in the header')
  }

  const rows: ParsedRow[] = []
  for (let i = 1; i < data.length; i++) {
    const row: ParsedRow = {} as ParsedRow
    for (let j = 0; j < headerKeys.length; j++) {
      const key = headerKeys[j]
      if (key === null) continue
      row[key] = data[i][j]
    }
    rows.push(row)
  }
  return rows
}
