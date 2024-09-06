export type BoardCell = {
  player: 1 | 2 | undefined
}

export interface GameRepository {
  save: (persistentGame: PersistentGame, gameUuid?: GameUuid) => Promise<GameUuid>
  load: (gameId: GameUuid) => Promise<undefined | PersistentGame>
  delete: (gameId: GameUuid) => Promise<boolean>
}

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  PLAYER_ONE_WIN = 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN = 'PLAYER_TWO_WIN',
  DRAW = 'DRAW',
}

export type PersistentGame = {
  board: Board
  activePlayer: PlayerNumber
  players: Record<PlayerNumber, PlayerStats>
  status: Status
}

export type GameParameters = {
  boardDimensions?: BoardDimensions
  repository?: GameRepository
}

export type PlayerMove = {
  player: 1 | 2
  targetCell: {
    row: number
    column: number
  }
}

export type BoardDimensions = {
  rows: number
  columns: number
}

export type Board = Array<Array<BoardCell>>

export interface PlayerStats {
  playerNumber: 1 | 2
  remainingDisks: number
}

export type PlayerNumber = 1 | 2

export type GameUuid = string
