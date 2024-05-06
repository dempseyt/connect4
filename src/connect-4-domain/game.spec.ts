import { describe, expect, it } from 'vitest'
import Game from '@/connect-4-domain/game'
describe('game', () => {
  describe('new game', () => {
    describe('given defaults', () => {
      it('returns an instance of Game', () => {
        const game = new Game()
        expect(game).toBeInstanceOf(Game)
      })
      it('creates a 6x7 board', () => {
        const game = new Game()
        const board = game.getBoard()
        expect(board).toMatchInlineSnapshot()
      })
    })
  })
})
