import { GameRepository, GameUuid, PersistentGame } from './game-types'

type Store = Map<GameUuid, PersistentGame>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<GameUuid, PersistentGame>()) {
    this.store = store
  }

  save(persistentGame: PersistentGame, gameUuid: GameUuid = crypto.randomUUID()): GameUuid {
    this.store.set(gameUuid, persistentGame)
    return gameUuid
  }

  load(gameId: GameUuid): PersistentGame | undefined {
    return this.store.get(gameId)
  }

  delete(gameId: GameUuid): boolean {
    return this.store.delete(gameId)
  }
}

export default InMemoryRepository
