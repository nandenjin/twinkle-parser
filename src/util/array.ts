import { strict as assert } from 'assert'

/**
 * Returns result of deep equal assestion
 * @param a
 * @param b
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(a: any, b: any): boolean {
  try {
    assert.deepStrictEqual(a, b)
    return true
  } catch (e) {
    return false
  }
}

/**
 * A extended version of array.indexOf with deep equal assertion
 * @param array
 * @param needle
 */
export function indexOfWithAssert<T>(array: T[], needle: T): number {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(array[i], needle)) {
      return i
    }
  }
  return -1
}

/**
 * Returns a copy of input array which is normalized with removing duplications
 * @param array
 */
export function removeDuplication<T>(array: T[]): T[] {
  return array.filter((x, i, self) => indexOfWithAssert(self, x) === i)
}

/**
 * Returns if the array are composed of elements of consecutive numbers
 * @param array
 */
export function isConsecutiveN(array: number[]): boolean {
  return array.every((x, i, self) => {
    if (i === 0) {
      return true
    }
    if (self[i] - self[i - 1] === 1) {
      return true
    } else {
      return false
    }
  })
}

/**
 * Returns union of two arrays a and b
 * @param a
 * @param b
 */
export function union<T>(a: T[], b: T[]): T[] {
  return removeDuplication(a.concat(b))
}
