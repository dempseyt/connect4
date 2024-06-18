import { Board, GameRepository } from './game'

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`

type Store = Map<GameUuid, Board>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<GameUuid, Board>()) {
    this.store = store
  }

  save(board: Board, boardUuid: GameUuid = crypto.randomUUID()): GameUuid {
    this.store.set(boardUuid, board)
    return boardUuid
  }

  load(boardId: GameUuid): Board | undefined {
    return this.store.get(boardId)
  }
}

export default InMemoryRepository
