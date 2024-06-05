import { expect, describe, it } from 'vitest'
import parseAsciiTable from './parse-ascii-table'
import isWinningMove from '@/connect-4-domain/is-winning-move'
import { BoardCell, PlayerMove } from '@/connect-4-domain/game'

describe('is-winning-move', () => {
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
  describe('given a board and the next players move', () => {
    describe('results in a vertical win', () => {
      it('detects the win', () => {
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
    describe('and the board has 3 rows', () => {
      it('does not result in a win', () => {
        const playerMove = {
          player: 1,
          targetCell: {
            row: 2,
            column: 0,
          },
        } as PlayerMove
        const asciiTable = `
|---|
| 1 |
|---|
| 2 |
|---|
|   |        
|---|
`
        const board = parseAsciiTable(asciiTable, customResolver)
        expect(isWinningMove(board, playerMove)).toEqual({
          isWin: false,
        })
      })
    })
  })
})
