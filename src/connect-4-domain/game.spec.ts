import { describe, expect, it } from 'vitest'
import GameFactory, { BoardCell, InvalidBoardDimensionsError } from '@/connect-4-domain/game'
import _toAsciiTable from './to-ascii-table'

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
  })
})
