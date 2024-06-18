import InMemoryRepository, { GameUuid } from '@/connect-4-domain/in-memory-repository'
import { describe, expect, it } from 'vitest'
import { Board, BoardCell, PersistentGame, Status } from './game'
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

const createPersistentGame = () => {
  const asciiTable = `
  |---|---|---|---|
  |   |   |   |   |
  |---|---|---|---|
  |   |   |   |   |
  |---|---|---|---|`
  const board: Board = parseAsciiTable(asciiTable, customResolver)
  const persistentGame: PersistentGame = {
    board,
    activePlayer: 1,
    players: {
      1: { playerNumber: 1, remainingDisks: 4 },
      2: { playerNumber: 2, remainingDisks: 4 },
    },
    status: 'IN_PROGRESS' as Status,
  }
  return persistentGame
}

describe('in-memory-repository', () => {
  describe('given defaults', () => {
    it('creates an in-memory repository', () => {
      const repository = new InMemoryRepository()
      expect(repository).toBeInstanceOf(InMemoryRepository)
    })
    it('loads a previously saved game', () => {
      const repository = new InMemoryRepository()
      const persistentGame = createPersistentGame()
      const gameId: GameUuid = repository.save2(persistentGame)

      expect(repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', () => {
      const repository = new InMemoryRepository()
      const gameId = crypto.randomUUID()
      expect(repository.load(gameId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    it('saves a game', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const persistentGame = createPersistentGame()
      const gameId = repository.save2(persistentGame)
      expect(store.get(gameId)).toMatchObject(persistentGame)
    })
    it('saves a game with a provided uuid', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const persistentGame = createPersistentGame()
      const gameId: GameUuid = crypto.randomUUID()
      const retrievedBoardId = repository.save2(persistentGame, gameId)
      expect(retrievedBoardId).toEqual(gameId)
      expect(store.get(gameId)).toMatchObject(persistentGame)
    })
    it('loads a board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const asciiTable = `
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|
      |   |   |   |   |
      |---|---|---|---|`
      const board: Board = parseAsciiTable(asciiTable, customResolver)
      const boardId: GameUuid = repository.save(board)
      expect(repository.load(boardId)).toBe(board)
    })
    it('returns undefined when loading a non-existent board', () => {
      const store = new Map()
      const repository = new InMemoryRepository(store)
      const boardId = crypto.randomUUID()
      expect(repository.load(boardId)).toBe(undefined)
    })
  })
})
