import { connect, connection, Model, model } from 'mongoose'
import { v4 } from 'uuid'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { Board, BoardCell, GameUuid, PersistentGame, Status } from './game-types'
import MongoRepository, { GameDocument, gameSchema } from './mongo-repository'
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

beforeAll(async () => {
  if (connection.readyState === 0) {
    await connect(import.meta.env.VITE_MONGODB_URI)
  }
})

afterAll(async () => {
  connection.close()
})

describe('mongo-repository', () => {
  describe('given defaults', () => {
    it('creates a mongo repository', () => {
      const repository = new MongoRepository()
      expect(repository).toBeInstanceOf(MongoRepository)
    })
    it('loads a previously saved game', async () => {
      const repository = new MongoRepository()
      const persistentGame = createPersistentGame()
      const gameId: GameUuid = await repository.save(persistentGame)

      expect(await repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', async () => {
      const repository = new MongoRepository()
      const gameId = v4()
      expect(await repository.load(gameId)).toBe(undefined)
    })
  })
  describe('given a store', () => {
    let gameModel: Model<GameDocument>
    let repository: MongoRepository
    beforeEach(() => {
      gameModel = model<GameDocument>('Game', gameSchema)
      repository = new MongoRepository(gameModel)
    })
    afterEach(async () => {
      await connection.db.dropDatabase()
    })

    it('saves a game', async () => {
      const persistentGame = createPersistentGame()
      const gameId = await repository.save(persistentGame)
      expect(await gameModel.findOne({ gameId })).toMatchObject(persistentGame)
    })
    it('saves a game with a provided uuid', async () => {
      const persistentGame = createPersistentGame()
      const gameId: GameUuid = v4()
      const retrievedBoardId = await repository.save(persistentGame, gameId)
      expect(retrievedBoardId).toEqual(gameId)
      expect(await gameModel.findOne({ gameId })).toMatchObject(persistentGame)
    })
    it('loads a game', async () => {
      const persistentGame = createPersistentGame()
      const gameId: GameUuid = await repository.save(persistentGame)
      expect(await repository.load(gameId)).toMatchObject(persistentGame)
    })
    it('returns undefined when loading a non-existent game', async () => {
      const gameId = v4()
      expect(await repository.load(gameId)).toBe(undefined)
    })
    it('deletes a saved game', async () => {
      const gameId = await repository.save(createPersistentGame())
      const wasDeleted = await repository.delete(gameId)
      expect(wasDeleted).toEqual(true)
      expect(await repository.load(gameId)).toEqual(undefined)
    })
  })
})
