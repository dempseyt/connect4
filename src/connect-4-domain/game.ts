import { v4 } from 'uuid'
import { MovePlayerCommand } from './commands'
import deepClone from './deep-clone'
import {
  PlayerMoveFailedEvent,
  PlayerMovedEvent,
  createPlayerMoveFailedEvent,
  createPlayerMovedEvent,
} from './events'
import {
  Board,
  BoardCell,
  BoardDimensions,
  GameParameters,
  GameRepository,
  GameUuid,
  PlayerNumber,
  PlayerStats,
  Status,
} from './game-types'
import getIsWinningMove from './get-is-winning-move'
import InMemoryRepository from './in-memory-repository'

export class InvalidBoardDimensionsError extends RangeError {}

interface Game {
  getBoard: () => ReadonlyArray<Array<BoardCell>>
  getPlayerStats: (playerNumber: PlayerNumber) => PlayerStats
  getStatus: () => Status
  getActivePlayer: () => PlayerNumber
  move: (movePlayerCommand: MovePlayerCommand) => PlayerMoveFailedEvent | PlayerMovedEvent
  save: () => Promise<GameUuid>
  load: (gameId: GameUuid) => Promise<void>
  delete: (gameId: GameUuid) => Promise<boolean>
}

class GameFactory implements Game {
  private board: Board
  private players: Record<PlayerNumber, PlayerStats>
  private activePlayer: PlayerNumber
  private status: Status
  private repository: GameRepository
  private boardDimensions: BoardDimensions

  constructor(
    {
      boardDimensions = { rows: 6, columns: 7 },
      repository = new InMemoryRepository(),
    }: GameParameters = {
      boardDimensions: {
        rows: 6,
        columns: 7,
      },
      repository: new InMemoryRepository(),
    },
  ) {
    this.validateBoardDimensions(boardDimensions)
    this.board = this.createBoard(boardDimensions)
    this.players = this.createPlayers(boardDimensions)
    this.activePlayer = 1
    this.status = Status.IN_PROGRESS
    this.repository = repository
    this.boardDimensions = boardDimensions
  }

  private validateBoardDimensions(boardDimensions: BoardDimensions) {
    if (boardDimensions.rows < 1) {
      throw new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1')
    } else if (boardDimensions.columns < 1) {
      throw new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1')
    } else if ((boardDimensions.rows * boardDimensions.columns) % 2 !== 0) {
      throw new InvalidBoardDimensionsError(
        `Total number of cells on a board must be even. Supplied board dimensions (${boardDimensions.rows} rows x ${boardDimensions.columns} columns) results in an odd number of cells (${boardDimensions.rows * boardDimensions.columns})`,
      )
    }
  }

  private createBoard({ rows, columns }: BoardDimensions): Board {
    const callback = () => new Array(columns).fill(undefined).map(() => ({ player: undefined }))
    const board = new Array(rows).fill(undefined).map(callback)
    return board
  }

  private createPlayers({ rows, columns }: BoardDimensions): Record<PlayerNumber, PlayerStats> {
    const calculateRemainingDiscs = (rows * columns) / 2
    return {
      1: { playerNumber: 1, remainingDisks: calculateRemainingDiscs },
      2: { playerNumber: 2, remainingDisks: calculateRemainingDiscs },
    }
  }

  getIsCellOnBoard(row: number, column: number): boolean {
    return this.getIsRowValid(row) && this.getIsColumnValid(column)
  }

  getIsRowValid(row: number): boolean {
    return row >= 0 && row < this.board.length
  }

  private getIsColumnValid(column: number): boolean {
    return column >= 0 && column < this.board[0].length
  }

  getIsCellUnoccupied(row: number, column: number): boolean {
    return this.board[row][column].player === undefined
  }

  getIsCellUnderneathOccupied(row: number, column: number): boolean {
    if (row === 0) return true
    return this.board[row - 1][column].player !== undefined
  }

  private createValidatedMove(
    moveFunction: (movePlayerCommand: MovePlayerCommand) => PlayerMovedEvent,
  ): (movePlayerCommand: MovePlayerCommand) => PlayerMoveFailedEvent | PlayerMovedEvent {
    function validatedMove(
      this: any,
      movePlayerCommand: MovePlayerCommand,
    ): PlayerMoveFailedEvent | PlayerMovedEvent {
      const {
        payload: {
          player,
          targetCell: { row, column },
        },
      } = movePlayerCommand

      if (this.status !== Status.IN_PROGRESS) {
        const message = `The game is no longer in progress.`
        return createPlayerMoveFailedEvent({ message: message })
      }

      if (this.getActivePlayer() !== player) {
        const message = `Player ${player} cannot move as player ${this.getActivePlayer() === 1 ? 1 : 2} is currently active.`
        return createPlayerMoveFailedEvent({ message: message })
      }

      if (
        this.getIsCellOnBoard(row, column) &&
        this.getIsCellUnoccupied(row, column) &&
        this.getIsCellUnderneathOccupied(row, column)
      ) {
        return moveFunction(movePlayerCommand)
      }

      if (!this.getIsCellOnBoard(row, column)) {
        let message = `The cell at row ${row} column ${column} does not exist on the board.`
        if (!this.getIsRowValid(row)) {
          message += ` The row number must be >= 0 and <= ${this.board.length - 1}.`
        }
        if (!this.getIsColumnValid(column)) {
          message += ` The column number must be >= 0 and <= ${this.board[0].length - 1}.`
        }
        return createPlayerMoveFailedEvent({ message: message })
      }

      if (!this.getIsCellUnderneathOccupied(row, column)) {
        const message = `The cell at row ${row} column ${column} cannot be placed there as there is no disk in the row below.`
        return createPlayerMoveFailedEvent({ message: message })
      }

      const message = `The cell at row ${row} column ${column} is already occupied.`
      return createPlayerMoveFailedEvent({ message: message })
    }
    return validatedMove
  }

  private _move({
    payload: {
      player,
      targetCell: { row, column },
    },
  }: MovePlayerCommand): PlayerMovedEvent {
    this.players[this.activePlayer].remainingDisks -= 1

    const playerOneRemainingDisks = this.getPlayerStats(1).remainingDisks
    const playerTwoRemainingDisks = this.getPlayerStats(2).remainingDisks
    const isWinningMove = getIsWinningMove(this.getBoard(), { player, targetCell: { row, column } })

    if (isWinningMove.isWin) {
      this.status = player === 1 ? Status.PLAYER_ONE_WIN : Status.PLAYER_TWO_WIN
    } else if (playerOneRemainingDisks === 0 && playerTwoRemainingDisks === 0) {
      this.status = Status.DRAW
    }
    this.board[row][column] = { player }
    this.activePlayer = this.activePlayer === 1 ? 2 : 1
    return createPlayerMovedEvent({ player, targetCell: { row, column } })
  }

  move = this.createValidatedMove(this._move.bind(this))

  getBoard() {
    return deepClone(this.board)
  }

  getStatus(): Status {
    return this.status
  }

  getPlayerStats(playerNumber: PlayerNumber): PlayerStats {
    return this.players[playerNumber]
  }

  getActivePlayer(): PlayerNumber {
    return this.activePlayer
  }

  restartGame() {
    this.board = this.createBoard(this.boardDimensions)
    this.players = this.createPlayers(this.boardDimensions)
    this.activePlayer = 1
    this.status = Status.IN_PROGRESS
  }

  async save() {
    const gameUuid = v4()
    if (this.repository !== undefined) {
      await this.repository?.save(
        {
          board: this.getBoard(),
          activePlayer: this.activePlayer,
          players: this.players,
          status: this.status,
        },
        gameUuid,
      )
    }
    return gameUuid
  }

  async load(gameId: GameUuid) {
    const gameStateToLoad = await this.repository?.load(gameId)
    if (gameStateToLoad !== undefined) {
      const { board, activePlayer, players, status } = gameStateToLoad
      this.board = board
      this.activePlayer = activePlayer
      this.players = players
      this.status = status
    } else {
      throw new Error('The provided game UUID is invalid.')
    }
  }

  async delete(gameId: GameUuid) {
    return await this.repository?.delete(gameId)
  }
}

export default GameFactory
