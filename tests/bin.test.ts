import * as path from 'path'
import { exec } from 'child_process'
import { KDBData } from '../src'

const pathToBin = path.resolve(__dirname, '../bin/twinkle-parser.js')

describe('CLI', () => {
  for (const ext of ['csv', 'xlsx']) {
    test('Basic with ' + ext, done => {
      const pathToSample = path.resolve(__dirname, './data/sample.' + ext)
      const parsed: KDBData = {
        AB10001: {
          title: '授業名',
          type: 1,
          unit: 2,
          targets: [2],
          termStr: '春AB',
          terms: [0, 1],
          periodStr: '火34',
          periods: [[[2], [2, 3]]],
          rooms: ['教室名'],
          instructors: ['教員名'],
          overview: 'ここには授業概要が入る。',
          remarks: 'ここには備考が入る。',
          updatedAt: 1583390263000,
        },
        AB10501: {
          title: '授業名',
          type: 1,
          unit: 2,
          targets: [2],
          termStr: '秋BC',
          terms: [4, 5],
          periodStr: '木1-6',
          periods: [[[4], [0, 1, 2, 3, 4, 5]]],
          rooms: ['教室名'],
          instructors: ['教員名1', '教員名2'],
          overview: 'ここには授業概要が入る。',
          remarks: 'ここには備考が入る。',
          updatedAt: 1583390263000,
        },
      }

      exec(pathToBin + ' ' + pathToSample, (error, stdout, stderr) => {
        if (error) throw error
        try {
          expect(JSON.parse(stdout)).toMatchObject(parsed)
          expect(stderr).toBe('')
          done()
        } catch (e) {
          done(e)
        }
      })
    })
  }

  test('Basic with fields option', done => {
    const pathToSample = path.resolve(__dirname, './data/sample.csv')
    const parsed = {
      AB10001: {
        title: '授業名',
      },
      AB10501: {
        title: '授業名',
      },
    }

    exec(
      pathToBin + ' ' + pathToSample + ' --fields title',
      (error, stdout, stderr) => {
        if (error) throw error
        try {
          expect(JSON.parse(stdout)).toMatchObject(parsed)
          expect(stderr).toBe('')
          done()
        } catch (e) {
          done(e)
        }
      }
    )
  })

  test('Basic with data with headline', done => {
    const pathToSample = path.resolve(
      __dirname,
      './data/sample_with_headline.csv'
    )
    const parsed: KDBData = {
      AB10001: {
        title: '授業名',
        type: 1,
        unit: 2,
        targets: [2],
        termStr: '春AB',
        terms: [0, 1],
        periodStr: '火34',
        periods: [[[2], [2, 3]]],
        rooms: ['教室名'],
        instructors: ['教員名'],
        overview: 'ここには授業概要が入る。',
        remarks: 'ここには備考が入る。',
        updatedAt: 1583390263000,
      },
      AB10501: {
        title: '授業名',
        type: 1,
        unit: 2,
        targets: [2],
        termStr: '秋BC',
        terms: [4, 5],
        periodStr: '木1-6',
        periods: [[[4], [0, 1, 2, 3, 4, 5]]],
        rooms: ['教室名'],
        instructors: ['教員名1', '教員名2'],
        overview: 'ここには授業概要が入る。',
        remarks: 'ここには備考が入る。',
        updatedAt: 1583390263000,
      },
    }

    exec(pathToBin + ' ' + pathToSample, (error, stdout, stderr) => {
      if (error) throw error
      try {
        expect(JSON.parse(stdout)).toMatchObject(parsed)
        expect(stderr).toBe('')
        done()
      } catch (e) {
        done(e)
      }
    })
  })
})
