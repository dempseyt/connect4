import {
  MovePlayerCommand,
  MovePlayerCommandPayload,
  createMovePlayerCommand,
} from '@/connect-4-domain/commands'
import GameFactory, { Board, BoardCell, InvalidBoardDimensionsError } from '@/connect-4-domain/game'
import * as R from 'ramda'
import { describe, expect, it, vi } from 'vitest'
import { PlayerMoveFailedEvent, PlayerMovedEvent } from './events'
import InMemoryRepository from './in-memory-repository'
import _toAsciiTable from './to-ascii-table'

function toAsciiTable(board: Array<Array<BoardCell>>): string {
  const cellResolver = (cell: BoardCell) => (cell.player === undefined ? ` ` : `${cell.player}`)
  return _toAsciiTable(board, cellResolver)
}

describe('game', () => {
  describe('new game', () => {
    it('creates a game where player 1 starts with a number of disks equal to half the number of cells', () => {
      const game = new GameFactory()
      expect(game.getPlayerStats(1)).toEqual(
        expect.objectContaining({
          playerNumber: 1,
          remainingDisks: 21,
        }),
      )
    })
    it('creates a game where player 2 starts with a number of disks equal to half the number of cells', () => {
      const game = new GameFactory()
      expect(game.getPlayerStats(2)).toEqual(
        expect.objectContaining({
          playerNumber: 2,
          remainingDisks: 21,
        }),
      )
    })
    it('creates a deep copy of the board', () => {
      const game = new GameFactory()
      const firstBoard = game.getBoard()
      const secondBoard = game.getBoard()
      expect(secondBoard).toBeDeeplyUnequal(firstBoard)
    })
    it('changes made to the game after a getBoard do not affect copies of the board', () => {
      const game = new GameFactory()
      const originalBoard = game.getBoard()
      expect(toAsciiTable(originalBoard)).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|"
          `)
      const movePlayerCommand = createMovePlayerCommand({
        player: 1,
        targetCell: {
          row: 0,
          column: 0,
        },
      })
      game.move(movePlayerCommand)
      const boardAfterMove = game.getBoard()
      expect(toAsciiTable(originalBoard)).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|"
          `)
      expect(toAsciiTable(boardAfterMove)).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|
            | 1 |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|"
          `)
      expect(boardAfterMove).toBeDeeplyUnequal(originalBoard)
    })
    describe('given defaults', () => {
      it('returns an instance of Game', () => {
        const game = new GameFactory()
        expect(game).toBeInstanceOf(GameFactory)
      })
      it('creates a 6x7 board', () => {
        const game = new GameFactory()
        const board = game.getBoard()
        const asciiBoard = toAsciiTable(board)
        expect(asciiBoard).toMatchInlineSnapshot(`
          "
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|
          |   |   |   |   |   |   |   |
          |---|---|---|---|---|---|---|"
        `)
      })
      it.todo('saves the game', () => {})
    })
    describe('persisting a game', () => {
      describe('given a custom repository', () => {
        it('saves the game', () => {
          const repository = new InMemoryRepository()
          const repositorySpy = vi.spyOn(repository, 'save')
          const game = new GameFactory({ repository })
          const { board, activePlayer, players, status } = repositorySpy.mock.calls[0][0]
          expect(toAsciiTable(game.getBoard())).toEqual(toAsciiTable(board))
          expect(activePlayer).toBe(1)
          expect(players).toMatchObject({
            1: { playerNumber: 1, remainingDisks: 21 },
            2: { playerNumber: 2, remainingDisks: 21 },
          })
          expect(status).toBe('IN_PROGRESS')
          const gameId = repositorySpy.mock.results[0].value
          const retrievedPersistedGame = repository.load(gameId)
          expect(retrievedPersistedGame).not.toBe(undefined)
          expect(retrievedPersistedGame).toMatchObject({
            board,
            activePlayer,
            players,
            status,
          })
        })
        it('loads a game', () => {
          const repository = new InMemoryRepository()
          const repositorySpy = vi.spyOn(repository, 'save')
          const game = new GameFactory({ repository })
          const gameId = repositorySpy.mock.results[0].value
          game.load(gameId)
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
          expect(game.getPlayerStats(1)).toMatchObject({
            playerNumber: 1,
            remainingDisks: 21,
          })
          expect(game.getPlayerStats(2)).toMatchObject({
            playerNumber: 2,
            remainingDisks: 21,
          })
          expect(game.getStatus()).toEqual('IN_PROGRESS')
        })
      })
    })
    describe('given custom board dimensions', () => {
      describe('with 0 rows', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 0, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1'),
          )
        })
      })
      describe('with 0 columns', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 2, columns: 0 } })).toThrow(
            new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1'),
          )
        })
      })
      describe('with a negative number of rows', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: -3, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError('Number of rows must be greater than or equal to 1'),
          )
        })
      })
      describe('with a negative number of columns', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 2, columns: -1 } })).toThrow(
            new InvalidBoardDimensionsError('Number of columns must be greater than or equal to 1'),
          )
        })
      })
      describe('which results in an odd number of cells', () => {
        it('throws an error', () => {
          expect(() => new GameFactory({ boardDimensions: { rows: 3, columns: 3 } })).toThrow(
            new InvalidBoardDimensionsError(
              `Total number of cells on a board must be even. Supplied board dimensions (3 rows x 3 columns) results in an odd number of cells (9)`,
            ),
          )
        })
      })
      describe('which results in an even number of cells', () => {
        it('should return an instance of the game', () => {
          const game = new GameFactory({ boardDimensions: { rows: 6, columns: 10 } })
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|
            |   |   |   |   |   |   |   |   |   |   |
            |---|---|---|---|---|---|---|---|---|---|"
          `)
        })
      })
    })
    it('returns the currently active player', () => {
      const game = new GameFactory()
      expect(game.getActivePlayer()).toBe(1)
    })
  })
  describe('making a move', () => {
    describe('given a player is currently active', () => {
      describe('and a cell location that is not on the board', () => {
        it('the player is unable to move to a cell with a row number below the first row', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: { row: -1, column: 0 },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'The cell at row -1 column 0 does not exist on the board. The row number must be >= 0 and <= 1.',
            },
          })
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
        })
        it('player should not be able to move to a cell with a row number above the last row', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: {
              row: 2,
              column: 0,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'The cell at row 2 column 0 does not exist on the board. The row number must be >= 0 and <= 1.',
            },
          })
        })
        it('player should not be able to move to a cell with a column number to the left of the first column', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: {
              row: 0,
              column: -1,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'The cell at row 0 column -1 does not exist on the board. The column number must be >= 0 and <= 1.',
            },
          })
        })
        it('player should not be able to move to a cell with a column number to the right of the last column', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'The cell at row 0 column 2 does not exist on the board. The column number must be >= 0 and <= 1.',
            },
          })
        })
        it('player should not be able to move to a cell with a row and column out of bounds', () => {
          const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
          const movePlayerCommand = createMovePlayerCommand({
            player: 1,
            targetCell: {
              row: -1,
              column: -1,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|
            |   |   |
            |---|---|
            |   |   |
            |---|---|"
          `)
          expect(game.getActivePlayer()).toBe(1)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message:
                'The cell at row -1 column -1 does not exist on the board. The row number must be >= 0 and <= 1. The column number must be >= 0 and <= 1.',
            },
          })
        })
      })
      describe('and the cell is on the first row', () => {
        describe('and the cell is unoccupied', () => {
          it('the player should be able to move a disk into a cell', () => {
            const game = new GameFactory({
              boardDimensions: { rows: 1, columns: 2 },
            })
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              |   |   |
              |---|---|"
            `)
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            })
            const playerMovedEvent = game.move(movePlayerCommand)
            expect(playerMovedEvent).toEqual({
              type: 'PLAYER_MOVED',
              payload: {
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              },
            })
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              | 1 |   |
              |---|---|"
            `)
            expect(game.getActivePlayer()).toBe(2)
          })
        })
        describe('and the cell is occupied', () => {
          it('the move fails', () => {
            const game = new GameFactory({ boardDimensions: { rows: 1, columns: 2 } })

            const playerMoveCommand1 = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 0,
                column: 0,
              },
            })
            game.move(playerMoveCommand1)
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              | 1 |   |
              |---|---|"
            `)
            const playerMoveCommand2 = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 0,
                column: 0,
              },
            })
            const playerMoveEvent = game.move(playerMoveCommand2)
            expect(playerMoveEvent).toEqual({
              type: 'PLAYER_MOVE_FAILED',
              payload: {
                message: 'The cell at row 0 column 0 is already occupied.',
              },
            })
          })
        })
      })
      describe('and a cell on the second row', () => {
        describe('and the cell below is occupied', () => {
          it('the player is able to move a disk into a cell', () => {
            const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
            game.move(
              createMovePlayerCommand({
                player: 1,
                targetCell: {
                  row: 0,
                  column: 0,
                },
              }),
            )
            const movePlayerCommand = createMovePlayerCommand({
              player: 2,
              targetCell: {
                row: 1,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toEqual({
              type: 'PLAYER_MOVED',
              payload: {
                player: 2,
                targetCell: {
                  row: 1,
                  column: 0,
                },
              },
            })
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              | 1 |   |
              |---|---|
              | 2 |   |
              |---|---|"
            `)
          })
        })
        describe('and the cell below is unoccupied', () => {
          it('the player should not be able to move a disk into the cell', () => {
            const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
            const movePlayerCommand = createMovePlayerCommand({
              player: 1,
              targetCell: {
                row: 1,
                column: 0,
              },
            })
            expect(game.move(movePlayerCommand)).toEqual({
              type: 'PLAYER_MOVE_FAILED',
              payload: {
                message:
                  'The cell at row 1 column 0 cannot be placed there as there is no disk in the row below.',
              },
            })
            expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
              "
              |---|---|
              |   |   |
              |---|---|
              |   |   |
              |---|---|"
            `)
          })
        })
      })
    })
    describe('given a player that is currently inactive', () => {
      it('the player is unable to make a move', () => {
        const game = new GameFactory({ boardDimensions: { rows: 2, columns: 2 } })
        const playerMoveCommand = createMovePlayerCommand({
          player: 2,
          targetCell: {
            row: 0,
            column: 0,
          },
        })
        expect(game.getActivePlayer()).toBe(1)
        const playerMoveEvent = game.move(playerMoveCommand)
        expect(playerMoveEvent).toEqual({
          type: 'PLAYER_MOVE_FAILED',
          payload: {
            message: `Player 2 cannot move as player 1 is currently active.`,
          },
        })
      })
    })
    describe('given a valid move', () => {
      it('decrements by one the moving players disks', () => {
        const game = new GameFactory()
        expect(game.getPlayerStats(1).remainingDisks).toBe(21)
        game.move(createMovePlayerCommand({ player: 1, targetCell: { row: 0, column: 0 } }))
        expect(game.getPlayerStats(1).remainingDisks).toBe(20)
      })
    })
    describe('given the game is over', () => {
      describe('as a player has won', () => {
        it('returns a move failed event', () => {
          const game = new GameFactory({
            boardDimensions: {
              rows: 2,
              columns: 4,
            },
          })
          const payloads = [
            { player: 1, targetCell: { row: 0, column: 0 } },
            { player: 2, targetCell: { row: 1, column: 0 } },
            { player: 1, targetCell: { row: 0, column: 1 } },
            { player: 2, targetCell: { row: 1, column: 1 } },
            { player: 1, targetCell: { row: 0, column: 2 } },
            { player: 2, targetCell: { row: 1, column: 2 } },
            { player: 1, targetCell: { row: 0, column: 3 } },
          ] satisfies MovePlayerCommandPayload[]

          payloads.forEach(
            R.pipe<
              [MovePlayerCommandPayload],
              MovePlayerCommand,
              PlayerMovedEvent | PlayerMoveFailedEvent
            >(createMovePlayerCommand, (playerMoveCommand: MovePlayerCommand) =>
              game.move(playerMoveCommand),
            ),
          )
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|---|---|
            | 1 | 1 | 1 | 1 |
            |---|---|---|---|
            | 2 | 2 | 2 |   |
            |---|---|---|---|"
          `)
          const movePlayerCommand = createMovePlayerCommand({
            player: 2,
            targetCell: {
              row: 1,
              column: 3,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message: 'The game is no longer in progress.',
            },
          })
        })
      })
      describe('as the result was a draw', () => {
        it('returns a move failed event', () => {
          const game = new GameFactory({
            boardDimensions: {
              rows: 1,
              columns: 4,
            },
          })
          const payloads = [
            { player: 1, targetCell: { row: 0, column: 0 } },
            { player: 2, targetCell: { row: 0, column: 1 } },
            { player: 1, targetCell: { row: 0, column: 2 } },
            { player: 2, targetCell: { row: 0, column: 3 } },
          ] satisfies MovePlayerCommandPayload[]

          payloads.forEach(
            R.pipe<
              [MovePlayerCommandPayload],
              MovePlayerCommand,
              PlayerMovedEvent | PlayerMoveFailedEvent
            >(createMovePlayerCommand, (playerMoveCommand: MovePlayerCommand) =>
              game.move(playerMoveCommand),
            ),
          )
          expect(toAsciiTable(game.getBoard())).toMatchInlineSnapshot(`
            "
            |---|---|---|---|
            | 1 | 2 | 1 | 2 |
            |---|---|---|---|"
          `)
          const movePlayerCommand = createMovePlayerCommand({
            player: 2,
            targetCell: {
              row: 0,
              column: 3,
            },
          })
          const event = game.move(movePlayerCommand)
          expect(event).toEqual({
            type: 'PLAYER_MOVE_FAILED',
            payload: {
              message: 'The game is no longer in progress.',
            },
          })
        })
      })
    })
  })
  describe('getting the status of the game', () => {
    describe('given a new game', () => {
      it('reports the status as in-progress', () => {
        const game = new GameFactory()
        const gameStatus = game.getStatus()
        expect(gameStatus).toBe('IN_PROGRESS')
      })
    })
    describe('and player one has won', () => {
      it('reports the status as player one win', () => {
        const game = new GameFactory({
          boardDimensions: {
            rows: 2,
            columns: 4,
          },
        })
        const payloads = [
          { player: 1, targetCell: { row: 0, column: 0 } },
          { player: 2, targetCell: { row: 1, column: 0 } },
          { player: 1, targetCell: { row: 0, column: 1 } },
          { player: 2, targetCell: { row: 1, column: 1 } },
          { player: 1, targetCell: { row: 0, column: 2 } },
          { player: 2, targetCell: { row: 1, column: 2 } },
          { player: 1, targetCell: { row: 0, column: 3 } },
        ] satisfies MovePlayerCommandPayload[]

        payloads.forEach(
          R.pipe<
            [MovePlayerCommandPayload],
            MovePlayerCommand,
            PlayerMovedEvent | PlayerMoveFailedEvent
          >(createMovePlayerCommand, (playerMoveCommand: MovePlayerCommand) =>
            game.move(playerMoveCommand),
          ),
        )
        expect(R.pipe<[], Board, string>(() => game.getBoard(), toAsciiTable)())
          .toMatchInlineSnapshot(`
          "
          |---|---|---|---|
          | 1 | 1 | 1 | 1 |
          |---|---|---|---|
          | 2 | 2 | 2 |   |
          |---|---|---|---|"
        `)
        const gameStatus = game.getStatus()
        expect(gameStatus).toEqual('PLAYER_ONE_WIN')
      })
    })
    describe('and player two has won', () => {
      it('reports the status as player two win', () => {
        const game = new GameFactory({
          boardDimensions: {
            rows: 1,
            columns: 10,
          },
        })
        const payloads = [
          { player: 1, targetCell: { row: 0, column: 0 } },
          { player: 2, targetCell: { row: 0, column: 9 } },
          { player: 1, targetCell: { row: 0, column: 1 } },
          { player: 2, targetCell: { row: 0, column: 8 } },
          { player: 1, targetCell: { row: 0, column: 2 } },
          { player: 2, targetCell: { row: 0, column: 7 } },
          { player: 1, targetCell: { row: 0, column: 4 } },
          { player: 2, targetCell: { row: 0, column: 6 } },
        ] satisfies MovePlayerCommandPayload[]

        payloads.forEach(
          R.pipe<
            [MovePlayerCommandPayload],
            MovePlayerCommand,
            PlayerMovedEvent | PlayerMoveFailedEvent
          >(createMovePlayerCommand, (playerMoveCommand: MovePlayerCommand) =>
            game.move(playerMoveCommand),
          ),
        )
        expect(R.pipe<[], Board, string>(() => game.getBoard(), toAsciiTable)())
          .toMatchInlineSnapshot(`
          "
          |---|---|---|---|---|---|---|---|---|---|
          | 1 | 1 | 1 |   | 1 |   | 2 | 2 | 2 | 2 |
          |---|---|---|---|---|---|---|---|---|---|"
        `)
        const gameStatus = game.getStatus()
        expect(gameStatus).toEqual('PLAYER_TWO_WIN')
      })
    })
    describe('given the game has come to a draw', () => {
      it('reports the status of the game as a draw', () => {
        const game = new GameFactory({ boardDimensions: { rows: 1, columns: 4 } })
        const payloads = [
          { player: 1, targetCell: { row: 0, column: 0 } },
          { player: 2, targetCell: { row: 0, column: 1 } },
          { player: 1, targetCell: { row: 0, column: 2 } },
          { player: 2, targetCell: { row: 0, column: 3 } },
        ] satisfies MovePlayerCommandPayload[]
        payloads.forEach(
          R.pipe<
            [MovePlayerCommandPayload],
            MovePlayerCommand,
            PlayerMovedEvent | PlayerMoveFailedEvent
          >(createMovePlayerCommand, (playerMoveCommand: MovePlayerCommand) =>
            game.move(playerMoveCommand),
          ),
        )
        expect(R.pipe<[], Board, string>(() => game.getBoard(), toAsciiTable)())
          .toMatchInlineSnapshot(`
          "
          |---|---|---|---|
          | 1 | 2 | 1 | 2 |
          |---|---|---|---|"
        `)
        expect(game.getStatus()).toEqual('DRAW')
      })
    })
  })
})
