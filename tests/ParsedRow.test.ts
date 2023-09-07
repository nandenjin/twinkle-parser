import { getRowsFromCSV } from '../src/ParsedRow'
import { header, sampleData, sampleParsedRow, serializeToCSV } from './data'

describe('getRowsFromCSV', () => {
  it('returns an array of ParsedRow', () => {
    const csvString = serializeToCSV([header, ...sampleData])
    const rowsExpected = sampleParsedRow
    expect(getRowsFromCSV(csvString)).toMatchObject(rowsExpected)
  })

  it('throws an error when csvString does not contain any data', () => {
    const csvString = serializeToCSV([[]])
    expect(() => getRowsFromCSV(csvString)).toThrowError(
      'csvString does not contain any data'
    )
  })

  it('throws an error when no field is found in the header', () => {
    const csvString = serializeToCSV([...sampleData])
    expect(() => getRowsFromCSV(csvString)).toThrowError(
      'No field is found in the header'
    )
  })
})
