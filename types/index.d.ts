export interface KDBData {
  [key: string]: KDBCourse
}

export interface KDBCourse {
  title: string
  type: number,
  unit: number,
  targets: number[],

  termStr: string
  periodStr: string
  terms: number[]
  periods: number[][][]
  rooms: string[]
  instructors: string[]
  overview: string
  remarks: string,
  updatedAt: number
}
