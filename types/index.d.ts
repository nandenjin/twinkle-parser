export interface KDBData {
  [key: string]: KDBCourse
}

export interface KDBCourse {
  title: string
  termStr: string
  periodStr: string
  terms: number[]
  periods: number[][][]
  rooms: string[]
  instructors: string[]
  overview: string
  remarks: string
}
