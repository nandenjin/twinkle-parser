import * as path from 'path'
import { exec } from 'child_process'
import { KDBData } from '../src'

const pathToBin = path.resolve(__dirname, '../bin/twinkle-parser.js')

describe('CLI', () => {
  test('Basic', done => {
    const pathToSample = path.resolve(__dirname, './data/sample.csv')
    const parsed: KDBData = {
      AB10001: {
        title: '授業名',
        termStr: '春AB',
        terms: [0, 1],
        periodStr: '火34',
        periods: [[[2], [2, 3]]],
        rooms: ['教室名'],
        instructors: ['教員名'],
        overview: 'ここには授業概要が入る。',
        remarks: 'ここには備考が入る。',
      },
      AB10501: {
        title: '授業名',
        termStr: '秋BC',
        terms: [4, 5],
        periodStr: '木1-6',
        periods: [[[4], [0, 1, 2, 3, 4, 5]]],
        rooms: ['教室名'],
        instructors: ['教員名1', '教員名2'],
        overview: 'ここには授業概要が入る。',
        remarks: 'ここには備考が入る。',
      },
    }

    exec(pathToBin + ' ' + pathToSample, (error, stdout, stderr) => {
      done(error)
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
