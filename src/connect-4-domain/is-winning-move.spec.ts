import { expect, describe, it } from 'vitest'
import parseAsciiTable from './parse-ascii-table'
import isWinningMove from '@/connect-4-domain/is-winning-move'
import { Board, BoardCell, PlayerMove } from '@/connect-4-domain/game'

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
    describe('results in a horizontal win', () => {
      describe('and there are 3 of the moving players tokens to the left of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
|---|---|---|---|
| 1 | 1 | 1 |   |
|---|---|---|---|
| 2 | 2 | 2 |   |
|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 3,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual({
            isWin: true,
          })
        })
      })
      describe('and there are 3 of the moving players tokens to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
|---|---|---|---|
|   | 1 | 1 | 1 |
|---|---|---|---|
|   | 2 | 2 | 2 |
|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 0,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual(expect.objectContaining({ isWin: true }))
        })
      })
      describe('and there are less than 3 columns to the left of the target cell', () => {
        describe('and there are no player tokens to the right hand side of the target cell', () => {
          it('does not detect a win', () => {
            const asciiTable = `
|---|---|---|---|
| 1 |   |   |   |
|---|---|---|---|
| 2 |   |   |   |
|---|---|---|---|`
            const board = parseAsciiTable(asciiTable, customResolver)
            const playerMove = {
              player: 1,
              targetCell: {
                row: 0,
                column: 1,
              },
            } as PlayerMove
            expect(isWinningMove(board, playerMove)).toEqual({
              isWin: false,
            })
          })
        })
      })
      describe('and there are less than 3 columns to the right of the target cell', () => {
        it('does not detect the win', () => {
          const asciiTable = `
|---|---|---|---|
|   |   |   | 1 |
|---|---|---|---|
|   |   |   | 2 |
|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({ isWin: false }),
          )
        })
      })
      describe('and there are 2 of the moving players tokens to the left and 1 to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
|---|---|---|---|
| 1 | 1 |   | 1 |
|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 2,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual(expect.objectContaining({ isWin: true }))
        })
      })
    })
    describe('and there are less than 4 rows on the board', () => {
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
|---|`
        const board = parseAsciiTable(asciiTable, customResolver)
        expect(isWinningMove(board, playerMove)).toEqual({
          isWin: false,
        })
      })
    })
    describe('and the winning column does not touch the board ceiling', () => {
      describe('and the players move results in a vertical win', () => {
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
})
