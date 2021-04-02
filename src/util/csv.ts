/**
 * Repair csvString that is not correctly escaped and make to be able to be parsed
 * - Escape double quotes that are not escaped
 * @param csvString original csv data
 * @returns csvString that is correctly escaped
 */
export const repairCSV = (csvString: string) =>
  csvString.replace(/"([\s\S]*?)"(\s*(?:[,\n]\s*)|$)/gm, (...s) => {
    const value = s[1]
    let repairedValue = value.replace(
      /"/g,
      (_: unknown, __: unknown, i: number) => {
        if (value.slice(i - 1).match(/^[\s\S]?""/)) {
          return '"'
        }
        return '""'
      }
    )
    return `"${repairedValue}"` + s[2]
  })
