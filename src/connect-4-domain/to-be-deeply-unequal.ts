import { MatcherResult } from '@/vitest'

const toBeDeeplyUnequal = (isNot: boolean, received: object, expected: object): MatcherResult => {
  return {
    pass: received !== expected,
    message: () => `Objects are deeply ${isNot ? 'un' : ''}equal`,
  }
}

export default toBeDeeplyUnequal
