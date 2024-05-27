import { MatcherResult } from '@/vitest'

function checkIsPlainObjectOrArray(value) {
  return (
    (value !== null &&
      typeof value === 'object' &&
      Object.getPrototypeOf(value) === Object.prototype) ||
    Array.isArray(value)
  )
}

function checkIfDeepUnequal(value1, value2) {
  if (
    (checkIsPlainObjectOrArray(value1) && !checkIsPlainObjectOrArray(value2)) ||
    (!checkIsPlainObjectOrArray(value1) && checkIsPlainObjectOrArray(value2)) ||
    (!checkIsPlainObjectOrArray(value1) && !checkIsPlainObjectOrArray(value2))
  ) {
    return true
  }

  if (value1 === value2) return false

  const objectKeys1 = Object.keys(value1)

  const isDeepUnequal = objectKeys1.reduce((isDeepUnequal, currentKey) => {
    return isDeepUnequal && checkIfDeepUnequal(value1[currentKey], value2[currentKey])
  }, true)

  return isDeepUnequal
}

function toBeDeeplyUnequal(
  this: { isNot: boolean } | void,
  received: object,
  expected: object,
): MatcherResult {
  const isNot = this ?? {}
  const areObjectsDifferent = checkIfDeepUnequal(received, expected)
  return {
    pass: areObjectsDifferent,
    message: () => `Objects are deeply ${isNot ? 'un' : ''}equal`,
  }
}

export default toBeDeeplyUnequal
