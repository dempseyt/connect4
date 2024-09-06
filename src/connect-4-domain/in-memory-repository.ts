import { v4 } from 'uuid'
import { GameRepository, GameUuid, PersistentGame } from './game-types'

type Store = Map<GameUuid, PersistentGame>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<GameUuid, PersistentGame>()) {
    this.store = store
  }

  async save(persistentGame: PersistentGame, gameUuid: GameUuid = v4()): Promise<GameUuid> {
    await this.store.set(gameUuid, persistentGame)
    return gameUuid
  }

  async load(gameId: GameUuid): Promise<PersistentGame | undefined> {
    return await this.store.get(gameId)
  }

  async delete(gameId: GameUuid): Promise<boolean> {
    return await this.store.delete(gameId)
  }
}

export default InMemoryRepository
