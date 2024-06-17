import InMemoryRepository, { BoardUuid } from '@/connect-4-domain/in-memory-repository'
import { describe, expect, it } from 'vitest'
import { Board, BoardCell } from './game'
import parseAsciiTable from './parse-ascii-table'

const customResolver = (value: string): BoardCell => {
  const playerNumber = Number.parseInt(value)
  if (playerNumber === 1 || playerNumber === 2) {
    return {
      player: playerNumber,
    }
  }
  return {
    player: undefined,
  }
}

describe('in-memory-repository', () => {
  describe('given defaults', () => {
    it('creates an in-memory repository', () => {
      const repository = new InMemoryRepository()
      expect(repository).toBeInstanceOf(InMemoryRepository)
    })
    it('loads a previously saved board', () => {
      const repository = new InMemoryRepository()
      const asciiTable = `
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|`
      const board: Board = parseAsciiTable(asciiTable, customResolver)
      const boardId: BoardUuid = repository.save(board)
      expect(repository.load(boardId)).toBe(board)
    })
  })
  describe('given a store', () => {
    it('saves a board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const asciiTable = `
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|`
      const board: Board = parseAsciiTable(asciiTable, customResolver)
      const boardId = repository.save(board)
      expect(store.get(boardId)).toBe(board)
    })
  })
})
