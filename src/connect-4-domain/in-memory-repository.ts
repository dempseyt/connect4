import { Board, GameRepository } from './game'

export type BoardUuid = `${string}-${string}-${string}-${string}-${string}`

type Store = Map<BoardUuid, Board>

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<BoardUuid, Board>()) {
    this.store = store
  }

  save(board: Board, boardUuid: BoardUuid = crypto.randomUUID()): BoardUuid {
    this.store.set(boardUuid, board)
    return boardUuid
  }

  load(boardId: BoardUuid): Board | undefined {
    return this.store.get(boardId)
  }
}

export default InMemoryRepository
