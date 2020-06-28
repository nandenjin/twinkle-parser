import {
  isEqual,
  indexOfWithAssert,
  removeDuplication,
  isConsecutiveN,
  union,
} from '../../src/util/array'

describe('isEqual', () => {
  test('Returns true for same constants', () => {
    expect(isEqual(0, 0)).toBe(true)
    expect(isEqual('ABC', 'ABC')).toBe(true)
    expect(isEqual(false, false)).toBe(true)
  })

  test('Returns false for different constants', () => {
    expect(isEqual(0, 1)).toBe(false)
    expect(isEqual('ABC', 'DEF')).toBe(false)
    expect(isEqual(true, false)).toBe(false)
  })

  test('Returns true for arrays/objects with same values', () => {
    expect(isEqual([0], [0])).toBe(true)
    expect(isEqual(['ABC'], ['ABC'])).toBe(true)
    expect(isEqual([true], [true])).toBe(true)
    expect(isEqual([0, 1, 2], [0, 1, 2])).toBe(true)
    expect(isEqual(['ABC', 'DEF', 'GH'], ['ABC', 'DEF', 'GH'])).toBe(true)
    expect(isEqual([true, false], [true, false])).toBe(true)
    expect(isEqual([true, 'ABC'], [true, 'ABC'])).toBe(true)
    expect(
      isEqual({ a: 0, b: true, c: 'ABC' }, { a: 0, b: true, c: 'ABC' })
    ).toBe(true)
  })

  test('Returns false for arrays/objects with different values', () => {
    expect(isEqual([0], [1])).toBe(false)
    expect(isEqual(['ABC'], ['DEF'])).toBe(false)
    expect(isEqual([true], [false])).toBe(false)
    expect(isEqual([0, 1, 2], [0, 2, 1])).toBe(false)
    expect(isEqual(['ABC', 'DEF', 'GH'], ['ABC', '', 'GH'])).toBe(false)
    expect(isEqual([true, false], [false, true])).toBe(false)
    expect(isEqual([false, 'ABC'], [null, 'ABC'])).toBe(false)
    expect(
      isEqual({ a: 0, b: null, c: 'ABC' }, { a: 0, b: false, c: 'ABC' })
    ).toBe(false)
  })
})

describe('indexOfWithAssert', () => {
  test('Returns index of given element', () => {
    expect(indexOfWithAssert([0, 1, 2], 1)).toBe(1)
    expect(indexOfWithAssert([true, false, null], null)).toBe(2)
    expect(indexOfWithAssert([0, 0, 0], 0)).toBe(0)
    expect(indexOfWithAssert([{}, { a: 1 }, {}], { a: 1 })).toBe(1)
  })

  test('Returns -1 when no matching element', () => {
    expect(indexOfWithAssert([0, 1, 2], 3)).toBe(-1)
    expect(indexOfWithAssert([true, true, true], false)).toBe(-1)
    expect(indexOfWithAssert([0, 0, 0], 1)).toBe(-1)
    expect(indexOfWithAssert([{}, { a: 1 }, {}], { a: 2 })).toBe(-1)
  })
})

describe('removeDuplication', () => {
  test('Removes duplicated elements and preserve first one element', () => {
    expect(removeDuplication([0, 0, 0, 0])).toMatchObject([0])
    expect(removeDuplication([0, 1, 0, 1])).toMatchObject([0, 1])
    expect(removeDuplication([true, false, null, null])).toMatchObject([
      true,
      false,
      null,
    ])
    expect(
      removeDuplication([{ x: 1 }, { y: 2 }, { z: 3 }, { x: 1 }])
    ).toMatchObject([{ x: 1 }, { y: 2 }, { z: 3 }])
  })

  test('Do nothing when no elements are duplicated', () => {
    expect(removeDuplication([0, 1, 2, 3])).toMatchObject([0, 1, 2, 3])
    expect(removeDuplication([true, false])).toMatchObject([true, false])
    expect(removeDuplication([{ x: 1 }, { y: 2 }, { z: 3 }])).toMatchObject([
      { x: 1 },
      { y: 2 },
      { z: 3 },
    ])
  })
})

describe('isConsequtiveN', () => {
  test('Returns true for consequtive arrays', () => {
    expect(isConsecutiveN([0, 1, 2, 3])).toBe(true)
    expect(isConsecutiveN([100, 101, 102, 103])).toBe(true)
    expect(isConsecutiveN([-2, -1, 0, 1])).toBe(true)
  })

  test('Returns false for non-consequtive arrays', () => {
    expect(isConsecutiveN([0, 1, 3, 2])).toBe(false)
    expect(isConsecutiveN([100, 100, 100, 101])).toBe(false)
    expect(isConsecutiveN([3, 2, 1, 0])).toBe(false)
    expect(isConsecutiveN([-1, 1, 3, 5])).toBe(false)
  })
})

describe('union', () => {
  test('Retrns union, non-duplicated arrays', () => {
    expect(union([0, 1, 2], [3, 4, 5])).toMatchObject([0, 1, 2, 3, 4, 5])
    expect(union([0, 1, 2], [1, 2, 3])).toMatchObject([0, 1, 2, 3])
    expect(
      union([{}, { x: 1 }, { y: 2 }], [{ y: 2 }, { x: 1 }, {}])
    ).toMatchObject([{}, { x: 1 }, { y: 2 }])
  })
})
