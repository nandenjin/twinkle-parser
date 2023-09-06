/* eslint-disable no-lone-blocks */
import parse, { KDBData } from '../src'

describe('parse', () => {
  test('Basic', () => {
    const csv =
      '"0000000","授業名","1","1.0","1・2","春A","月1","1H101","教員名","概要","備考","","","","","Title in English","0000000","授業名","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '授業名',
        type: 1,
        unit: 1,
        targets: [1, 2],
        termStr: '春A',
        terms: [0],
        periodStr: '月1',
        periods: [[[1], [0]]],
        rooms: ['1H101'],
        instructors: ['教員名'],
        overview: '概要',
        remarks: '備考',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Multi terms', () => {
    {
      const csv =
        '"0000000","","","","","秋ABC","","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '秋ABC',
          terms: [3, 4, 5],
          periodStr: '',
          periods: [],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }

    {
      const csv =
        '"0000000","","","","","秋AB\n秋C","","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '秋AB\n秋C',
          terms: [3, 4, 5],
          periodStr: '',
          periods: [],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }

    {
      const csv =
        '"0000000","","","","","秋AB 秋C","","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '秋AB 秋C',
          terms: [3, 4, 5],
          periodStr: '',
          periods: [],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }
  })

  test('Multi periods', () => {
    const csv =
      '"0000000","","","","","","月1-6","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '',
        terms: [],
        periodStr: '月1-6',
        periods: [[[1], [0, 1, 2, 3, 4, 5]]],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Multi periods series', () => {
    // One day for one line
    {
      const csv =
        '"0000000","","","","","","月1-6\n水2-5\n土3-4","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '',
          terms: [],
          periodStr: '月1-6\n水2-5\n土3-4',
          periods: [
            [[1], [0, 1, 2, 3, 4, 5]],
            [[3], [1, 2, 3, 4]],
            [[6], [2, 3]],
          ],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }

    // Multi day for one line
    {
      const csv =
        '"0000000","","","","","","月金1-6","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '',
          terms: [],
          periodStr: '月金1-6',
          periods: [
            [
              [1, 5],
              [0, 1, 2, 3, 4, 5],
            ],
          ],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }

    // Mixed and unsorted
    {
      const csv =
        '"0000000","","","","","","水火1-6\n土2-4","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '',
          terms: [],
          periodStr: '水火1-6\n土2-4',
          periods: [
            [
              [2, 3],
              [0, 1, 2, 3, 4, 5],
            ],
            [[6], [1, 2, 3]],
          ],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }

    // Separated by comma
    {
      const csv =
        '"0000000","","","","","","水火1-6,土2-4","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
      const parsed: KDBData = {
        '0000000': {
          title: '',
          type: 0,
          unit: 0,
          targets: [],
          termStr: '',
          terms: [],
          periodStr: '水火1-6,土2-4',
          periods: [
            [
              [2, 3],
              [0, 1, 2, 3, 4, 5],
            ],
            [[6], [1, 2, 3]],
          ],
          rooms: [],
          instructors: [],
          overview: '',
          remarks: '',
          updatedAt: 1614852144000,
        },
      }
      expect(parse(csv)).toMatchObject(parsed)
    }
  })

  test('Return empty array for unparsable term string', () => {
    const csv =
      '"0000000","","","","","開講モジュール","","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '開講モジュール',
        terms: [],
        periodStr: '',
        periods: [],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Concat consequtive periods sets', () => {
    const csv =
      '"0000000","","","","","","月1-3\n月4-6","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '',
        terms: [],
        periodStr: '月1-3\n月4-6',
        periods: [[[1], [0, 1, 2, 3, 4, 5]]],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Return empty array for unparsable period string', () => {
    const csv =
      '"0000000","","","","","","開講時限","","","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '',
        terms: [],
        periodStr: '開講時限',
        periods: [],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Return empty array for empty or space-only room string', () => {
    const csv =
      '"0000000","","","","","","",", ,, ,, ,,, \n\n, ,\n, \n  ","","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '',
        terms: [],
        periodStr: '',
        periods: [],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })

  test('Return empty array for empty or space-only instructors string', () => {
    const csv =
      '"0000000","","","","","","","",", , ,, ,, ,, ,, \n\n,   ,","","","","","","","","0000000","","2021-03-04 19:02:24"'
    const parsed: KDBData = {
      '0000000': {
        title: '',
        type: 0,
        unit: 0,
        targets: [],
        termStr: '',
        terms: [],
        periodStr: '',
        periods: [],
        rooms: [],
        instructors: [],
        overview: '',
        remarks: '',
        updatedAt: 1614852144000,
      },
    }
    expect(parse(csv)).toMatchObject(parsed)
  })
})
