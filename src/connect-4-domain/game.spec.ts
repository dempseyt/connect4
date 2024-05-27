import { describe, expect, it } from 'vitest'
import GameFactory, { BoardCell } from '@/connect-4-domain/game'
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
    })
  })
})
