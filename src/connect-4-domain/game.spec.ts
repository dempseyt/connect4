import { describe, expect, it } from 'vitest'
import GameFactory from '@/connect-4-domain/game'
import _toAsciiTable from './to-ascii-table'
import { BoardCell } from '@/connect-4-domain/BoardCell'

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
    })
  })
})
