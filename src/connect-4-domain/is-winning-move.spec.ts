import { expect, describe, it } from 'vitest'
import parseAsciiTable from './parse-ascii-table'
import isWinningMove from '@/connect-4-domain/is-winning-move'
import { BoardCell, PlayerMove } from '@/connect-4-domain/game'

describe('is-winning-move', () => {
  describe('given a board and the next players move', () => {
    describe('results in a vertical win', () => {
      it('detects the win', () => {
        const customResolver = (value: string): BoardCell => {
          const playerNumber = Number.parseInt(value)
          if (playerNumber === 1 || playerNumber === 2) {
            return {
              player: playerNumber,
            }
          }
          return {
            player: undefined,
          }
        }
        const asciiTable = `
|---|---|
| 1 | 2 |
|---|---| 
| 1 | 2 |
|---|---| 
| 1 | 2 |
|---|---| 
|   |   |
|---|---|`
        const board = parseAsciiTable(asciiTable, customResolver)
        const playerMove = {
          player: 1,
          targetCell: {
            row: 3,
            column: 0,
          },
        } as PlayerMove
        expect(isWinningMove(board, playerMove)).toEqual(
          expect.objectContaining({
            isWin: true,
          }),
        )
      })
    })
  })
})
