import { repairCSV } from '../../src/util/csv'

describe('repairCsv', () => {
  it('does nothing for valid CSV', () => {
    const validCSVStrings = [
      '"a","b","c"\n"d","e","f"',
      '"a","b","c"\n',
      '"abc","d""e""f"',
      '"a""","b","c",\n"d",""""',
    ]
    for (const s of validCSVStrings) {
      expect(repairCSV(s)).toBe(s)
    }
  })

  it('repairs non-escaped double quotations', () => {
    const csvStrings = [
      ['"""', '""""'],
      ['"a"b"c","def"', '"a""b""c","def"'],
      ['"abc","d"e"\n"a"b"c"', '"abc","d""e"\n"a""b""c"'],
    ]
    for (const s of csvStrings) {
      expect(repairCSV(s[0])).toBe(s[1])
    }
  })
})
