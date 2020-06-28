/* eslint-disable no-lone-blocks */
import parse, { KDBData } from '../src'

describe('parse', () => {
  test('Basics', () => {
    const csv = `"0000000","授業名","1","1.0","1・2","春A","月1","1H101","教員名","概要","備考","","","Title in English","0000000","授業名",""`
    const parsed: KDBData = {
      '0000000': {
        title: '授業名',
        termStr: '春A',
        terms: [0],
        periodStr: '月1',
        periods: [[[1], [0]]],
        rooms: ['1H101'],
        instructors: ['教員名'],
        overview: '概要',
        remarks: '備考'
      }
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Return empty array for unparsable term string', () => {
    const csv = `"0000000","授業名","1","1.0","1・2","開講モジュール","月1","1H101","教員名","概要","備考","","","Title in English","0000000","授業名",""`
    const parsed: KDBData = {
      '0000000': {
        title: '授業名',
        termStr: '開講モジュール',
        terms: [],
        periodStr: '月1',
        periods: [[[1], [0]]],
        rooms: ['1H101'],
        instructors: ['教員名'],
        overview: '概要',
        remarks: '備考'
      }
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Return empty array for unparsable period string', () => {
    const csv = `"0000000","授業名","1","1.0","1・2","春A","開講時限","1H101","教員名","概要","備考","","","Title in English","0000000","授業名",""`
    const parsed: KDBData = {
      '0000000': {
        title: '授業名',
        termStr: '春A',
        terms: [0],
        periodStr: '開講時限',
        periods: [],
        rooms: ['1H101'],
        instructors: ['教員名'],
        overview: '概要',
        remarks: '備考'
      }
    }
    expect(parse(csv)).toMatchObject(parsed)
  })
})
