import { describe, expect, it } from 'vitest'
import GameFactory, { BoardCell, InvalidBoardDimensionsError } from '@/connect-4-domain/game'
import _toAsciiTable from './to-ascii-table'
import { createMovePlayerCommand } from '@/connect-4-domain/commands'

function toAsciiTable(board: Array<Array<BoardCell>>): string {
  const cellResolver = (cell: BoardCell) => (cell.player === undefined ? ` ` : `${cell.player}`)
  return _toAsciiTable(board, cellResolver)
}

describe('game', () => {
  describe('new game', () => {
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
      it('creates a game where player 1 starts with a number of tokens equal to half the number of cells', () => {
        const game = new GameFactory()
        expect(game.getPlayerStats(1)).toEqual(
          expect.objectContaining({
            playerNumber: 1,
            remainingDiscs: 21,
          }),
        )
      })
      it('creates a game where player 2 starts with a number of discs equal to half the number of cells', () => {
        const game = new GameFactory()
        expect(game.getPlayerStats(2)).toEqual(
          expect.objectContaining({
            playerNumber: 2,
            remainingDiscs: 21,
          }),
        )
      })
      it('creates a deep copy of the board', () => {
        const game = new GameFactory()
        const firstBoard = game.getBoard()
        const secondBoard = game.getBoard()
        expect(secondBoard).toBeDeeplyUnequal(firstBoard)
      })
      it.todo(
        'changes made to the game after a getBoard do not affect copies of the board',
        () => {},
      )
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
      })
    })
  })
})
