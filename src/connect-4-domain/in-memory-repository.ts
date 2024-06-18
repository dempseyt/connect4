import { Board, GameRepository, PersistentGame } from './game'

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`

type Store = Map<GameUuid, Board | PersistentGame>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<GameUuid, Board>()) {
    this.store = store
  }

  save(persistentGame: PersistentGame, gameUuid: GameUuid = crypto.randomUUID()): GameUuid {
    this.store.set(gameUuid, persistentGame)
    return gameUuid
  }

  load(boardId: GameUuid): Board | PersistentGame | undefined {
    return this.store.get(boardId)
  }
}

export default InMemoryRepository
