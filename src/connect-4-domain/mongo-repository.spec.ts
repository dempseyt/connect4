import { describe, expect, it } from 'vitest'

describe('mongo-repository', () => {
  describe('given defaults', () => {
    it('creates a mongo repository', () => {
      const repository = new MongoRepository()
      expect(repository).toBeInstanceOf(MongoRepository)
    })
  })
})
