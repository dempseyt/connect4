import { describe, expect, it } from 'vitest'

describe('deep-clone', () => {
  it('should return a primitive value as is', () => {
    expect(deepClone(2)).toBe(2)
  })
})
