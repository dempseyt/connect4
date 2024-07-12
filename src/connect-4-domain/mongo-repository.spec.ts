import { describe, expect, it } from 'vitest'
import MongoRepository from './mongo-repository'

describe('mongo-repository', () => {
  describe('given defaults', () => {
    it('creates a mongo repository', () => {
      const repository = new MongoRepository()
      expect(repository).toBeInstanceOf(MongoRepository)
    })
  })
})
