import { GameStatus } from '@/connect-4-ui/GameStatus'
import { Model, Schema, model } from 'mongoose'
import { v4 } from 'uuid'
import { GameRepository, GameUuid, PersistentGame } from './game-types'

export const gameSchema = new Schema({
  gameId: { type: String, required: true, unique: true },
  board: {
    type: [
      [
        {
          player: { type: Number, required: false },
        },
      ],
    ],
    required: true,
  },
  activePlayer: { type: Number, required: true },
  players: {
    type: {
      '1': {
        playerNumber: { type: Number, required: true },
        remainingDisks: { type: Number, required: true },
      },
      '2': {
        playerNumber: { type: Number, required: true },
        remainingDisks: { type: Number, required: true },
      },
    },
    required: true,
  },
  status: { type: String, enum: Object.values(GameStatus), required: true },
})

export interface GameDocument extends Document, PersistentGame {}

class MongoRepository implements GameRepository {
  private gameModel: Model<GameDocument>

  constructor(gameModel?: Model<GameDocument>) {
    if (gameModel !== undefined) {
      this.gameModel = gameModel
    } else {
      this.gameModel = model<GameDocument>('Game', gameSchema)
    }
  }

  async save(persistedGame: PersistentGame, gameId: GameUuid = v4()): Promise<GameUuid> {
    try {
      await this.gameModel.create({
        gameId,
        board: persistedGame.board,
        activePlayer: persistedGame.activePlayer,
        players: persistedGame.players,
        status: persistedGame.status,
      })

      return gameId
    } catch (error) {
      throw new Error('Failed to save game.')
    }
  }

  async load(gameId: GameUuid): Promise<PersistentGame | undefined> {
    try {
      const gameToLoad = await this.gameModel.findOne({ gameId }).exec()

      if (gameToLoad !== undefined && gameToLoad !== null) {
        return {
          board: gameToLoad.board,
          activePlayer: gameToLoad.activePlayer,
          players: {
            1: gameToLoad.players['1'],
            2: gameToLoad.players['2'],
          },
          status: gameToLoad.status,
        }
      } else {
        return undefined
      }
    } catch (error) {
      console.error('Error loading game: ', error)

      return undefined
    }
  }

  async delete(gameId: GameUuid): Promise<boolean> {
    const { deletedCount } = await this.gameModel.deleteOne({ gameId })

    if (deletedCount === 0) {
      return false
    }
    return true
  }
}

export default MongoRepository
