/* eslint-disable no-lone-blocks */
import parse, { KDBData } from '../src'
import { header, sampleData, sampleParsedData, serializeToCSV } from './data'

describe('parse', () => {
  test('Basic', () => {
    const csv = serializeToCSV([header, ...sampleData])
    expect(parse(csv)).toMatchObject(sampleParsedData)
  })

  test('Multi terms', () => {
    {
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '秋ABC',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '秋AB\n秋C',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '秋AB 秋C',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
    const csv = serializeToCSV([
      [
        '科目番号',
        '科目名',
        '授業方法',
        '単位数',
        '標準履修年次',
        '実施学期',
        '曜時限',
        '教室',
        '担当教員',
        '授業概要',
        '備考',
        '科目等履修生申請可否',
        '申請条件',
        '短期留学生申請可否',
        '申請条件',
        '英語(日本語)科目名',
        '科目コード',
        '要件科目名',
        'データ更新日',
      ],
      [
        '0000000',
        '',
        '',
        '',
        '',
        '',
        '月1-6',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '0000000',
        '',
        '2021-03-04 19:02:24',
      ],
    ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '',
          '月1-6\n水2-5\n土3-4',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '',
          '月金1-6',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '',
          '水火1-6\n土2-4',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
      const csv = serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
        [
          '0000000',
          '',
          '',
          '',
          '',
          '',
          '水火1-6,土2-4',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '0000000',
          '',
          '2021-03-04 19:02:24',
        ],
      ])
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
    const csv = serializeToCSV([
      [
        '科目番号',
        '科目名',
        '授業方法',
        '単位数',
        '標準履修年次',
        '実施学期',
        '曜時限',
        '教室',
        '担当教員',
        '授業概要',
        '備考',
        '科目等履修生申請可否',
        '申請条件',
        '短期留学生申請可否',
        '申請条件',
        '英語(日本語)科目名',
        '科目コード',
        '要件科目名',
        'データ更新日',
      ],
      [
        '0000000',
        '',
        '',
        '',
        '',
        '開講モジュール',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '0000000',
        '',
        '2021-03-04 19:02:24',
      ],
    ])
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
    const csv = serializeToCSV([
      [
        '科目番号',
        '科目名',
        '授業方法',
        '単位数',
        '標準履修年次',
        '実施学期',
        '曜時限',
        '教室',
        '担当教員',
        '授業概要',
        '備考',
        '科目等履修生申請可否',
        '申請条件',
        '短期留学生申請可否',
        '申請条件',
        '英語(日本語)科目名',
        '科目コード',
        '要件科目名',
        'データ更新日',
      ],
      [
        '0000000',
        '',
        '',
        '',
        '',
        '',
        '月1-3\n月4-6',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '0000000',
        '',
        '2021-03-04 19:02:24',
      ],
    ])
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
    const csv = serializeToCSV([
      [
        '科目番号',
        '科目名',
        '授業方法',
        '単位数',
        '標準履修年次',
        '実施学期',
        '曜時限',
        '教室',
        '担当教員',
        '授業概要',
        '備考',
        '科目等履修生申請可否',
        '申請条件',
        '短期留学生申請可否',
        '申請条件',
        '英語(日本語)科目名',
        '科目コード',
        '要件科目名',
        'データ更新日',
      ],
      [
        '0000000',
        '',
        '',
        '',
        '',
        '',
        '開講時限',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '0000000',
        '',
        '2021-03-04 19:02:24',
      ],
    ])
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
    const csv = [
      serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
      ]),
      '"0000000","","","","","","",", ,, ,, ,,, \n\n, ,\n, \n  ","","","","","","","","","0000000","","2021-03-04 19:02:24"',
    ].join('\n')
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
    const csv = [
      serializeToCSV([
        [
          '科目番号',
          '科目名',
          '授業方法',
          '単位数',
          '標準履修年次',
          '実施学期',
          '曜時限',
          '教室',
          '担当教員',
          '授業概要',
          '備考',
          '科目等履修生申請可否',
          '申請条件',
          '短期留学生申請可否',
          '申請条件',
          '英語(日本語)科目名',
          '科目コード',
          '要件科目名',
          'データ更新日',
        ],
      ]),
      '"0000000","","","","","","","",", , ,, ,, ,, ,, \n\n,   ,","","","","","","","","0000000","","2021-03-04 19:02:24"',
    ].join('\n')
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

  test('Skip headlines', () => {
    const csv = [
      '"This","is","not","a","data","line"',
      '"And","the","next","is","empty","line"',
      '"","","","","",""',
    ].join('\n')
    const parsed: KDBData = {}
    expect(parse(csv)).toMatchObject(parsed)
  })
})
