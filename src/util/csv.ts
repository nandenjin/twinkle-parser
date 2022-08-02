/**
 * Repair csvString that is not correctly escaped and make to be able to be parsed
 * - Escape double quotes that are not escaped
 *
 * **[LIMITATION]** This function only supports CSV with double-quoted values
 * @param csvString original csv data
 * @returns csvString that is correctly escaped
 */
export const repairCSV = (csvString: string): string => {
  /** Escape content inside quotation */
  const escape = (content: string) => {
    let result = ''
    do {
      /** The next position of quotation */
      const x = content.indexOf('"')

      if (x > -1) {
        // The content contains quotation

        /** Weather it is already escaped or not */
        const isEscaped = content.substring(x, x + 2) === '""'

        // Add to result with escaped quotation
        result += content.substring(0, x) + '""'

        // Remove proceeded content
        content = content.slice(x + (isEscaped ? 2 : 1))
      } else {
        // The content does not contains quotation
        result += content
        content = ''
      }
    } while (content.indexOf('"') > -1)

    // Add remained content
    result += content

    // Return result
    return result
  }

  /** Separated lines */
  const lines = csvString.split('\n')

  const repairedLines: string[] = []

  for (let line of lines) {
    /** Cell data with quotations and delimiters */
    const segments: string[] = []

    while (line.length > 0) {
      // Detect the next segment
      const check = line.match(/^"(.*?)"(,|$)/)
      if (check) {
        const content = check[1]
        const delimiter = check[2] || ''

        // Compose segments
        segments.push(`"${escape(content)}"${delimiter}`)

        // Remove proceeded part from the line
        line = line.slice(check[0].length)
      } else {
        // Check if the line contains segments after current position
        const lostCheck = line.match(/^(.+?)"(,|$)/)
        if (lostCheck) {
          // Undo the last segment, remove the first quotation and concat to current one
          const content = (segments.pop() || '').slice(1) + lostCheck[1]
          const delimiter = lostCheck[2] || ''

          // Compose segments
          segments.push(`"${escape(content)}"${delimiter}`)

          // Remove proceeded part from the line
          line = line.slice(lostCheck[0].length)
        } else {
          // Regard all of the rest content is a whole cell
          segments.push(`"${escape(line)}"`)

          // Go to next line
          break
        }
      }
    }

    // Compose repaired line
    repairedLines.push(segments.join(''))
  }
  return repairedLines.join('\n')
}
