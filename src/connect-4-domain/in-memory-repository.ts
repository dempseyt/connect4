import { GameRepository, PersistentGame } from './game'

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`

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
}

export default InMemoryRepository
