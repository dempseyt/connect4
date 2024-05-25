import { describe, expect, it } from 'vitest'

describe('to-be-deeply-unequal', () => {
  it('should fail when given objects are the same objects', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = obj1
    expect(obj1).not.toBeDeeplyUnequal(obj2)
  })
  it('should pass when given objects are different objects', () => {
    const obj1 = {}
    const obj2 = {}
    expect(obj1).toBeDeeplyUnequal(obj2)
  })
  it('should pass given an array and an object', () => {
    const arr = []
    const obj = {}
    expect(arr).toBeDeeplyUnequal(obj)
  })
})
