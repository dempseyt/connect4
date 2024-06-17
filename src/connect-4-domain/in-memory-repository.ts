import { Board } from './game'

export type BoardUuid = `${string}-${string}-${string}-${string}-${string}`

type Store = Map<BoardUuid, Board>

interface GameRepository {
  save: (board: Board) => BoardUuid
  load: (boardId: BoardUuid) => Board | undefined
}

class InMemoryRepository implements GameRepository {
  private store: Store

  constructor(store: Store = new Map<BoardUuid, Board>()) {
    this.store = store
  }

  save(board: Board): BoardUuid {
    const boardId = crypto.randomUUID()
    this.store.set(boardId, board)
    return boardId
  }

  load(boardId: BoardUuid): Board | undefined {
    return this.store.get(boardId)
  }
}

export default InMemoryRepository
