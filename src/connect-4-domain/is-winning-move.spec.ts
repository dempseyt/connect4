import { BoardCell, PlayerMove } from '@/connect-4-domain/game'
import isWinningMove from '@/connect-4-domain/is-winning-move'
import { describe, expect, it } from 'vitest'
import parseAsciiTable from './parse-ascii-table'

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
  describe('checking for a horizontal win', () => {
    describe('given a board and the next players move', () => {
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
      describe('and there is 1 of the moving player tokens to the left and 2 to the right of the target cell', () => {
        it('detects the win', () => {
          const asciiTable = `
|---|---|---|---|
| 1 |   | 1 | 1 |
|---|---|---|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 0,
              column: 1,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual(expect.objectContaining({ isWin: true }))
        })
      })
    })
  })
  describe('checking for a vertical win', () => {
    describe('given a board and the next players move', () => {
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
      describe('and there are 3 of the moving players tokens beneath the target cell', () => {
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
      describe('and the column does not contain 3 of the moving players tokens separated by a single empty cell', () => {
        it('does not detect a win', () => {
          const asciiTable = `
|---|
| 1 |
|---|
| 1 |
|---|
|   |
|---|
|   |
|---|
| 1 |
|---|`
          const board = parseAsciiTable(asciiTable, customResolver)
          const playerMove = {
            player: 1,
            targetCell: {
              row: 2,
              column: 0,
            },
          } as PlayerMove
          expect(isWinningMove(board, playerMove)).toEqual(
            expect.objectContaining({ isWin: false }),
          )
        })
      })
    })
  })
  describe('checking for a diagonal win', () => {
    describe('that is bottom-left to top-right', () => {
      describe('given a board and the next players move', () => {
        describe('with 3 of the moving players discs to the left of the target cell', () => {
          it('detects the win', () => {
            const asciiTable = `
|---|---|---|---|
| 1 |   |   |   |
|---|---|---|---|
|   | 1 |   |   |
|---|---|---|---|
|   |   | 1 |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`
            const board = parseAsciiTable(asciiTable, customResolver)
            const playerMove = {
              player: 1,
              targetCell: {
                row: 3,
                column: 3,
              },
            } as PlayerMove
            expect(isWinningMove(board, playerMove)).toEqual(
              expect.objectContaining({ isWin: true }),
            )
          })
        })
        describe('with 2 of the moving players tokens are to the left and 1 moving players tokens to the right', () => {
          it('detects the win', () => {
            const asciiTable = `
|---|---|---|---|
| 1 |   |   |   |
|---|---|---|---|
|   | 1 |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|
|   |   |   | 1 |
|---|---|---|---|`
            const board = parseAsciiTable(asciiTable, customResolver)
            const playerMove = {
              player: 1,
              targetCell: {
                row: 2,
                column: 2,
              },
            } satisfies PlayerMove
            expect(isWinningMove(board, playerMove)).toEqual(
              expect.objectContaining({ isWin: true }),
            )
          })
        })
      })
    })
    describe('that is top-left to bottom-right', () => {
      describe('given a board and the next players move', () => {
        describe('with 3 of the moving players discs to the left of the target cell', () => {
          it('detects the win', () => {
            const asciiTable = `
|---|---|---|---|
|   |   |   | 1 |
|---|---|---|---|
|   |   | 1 |   |
|---|---|---|---|
|   | 1 |   |   |
|---|---|---|---|
|   |   |   |   |
|---|---|---|---|`
            const board = parseAsciiTable(asciiTable, customResolver)
            const playerMove = {
              player: 1,
              targetCell: {
                row: 3,
                column: 0,
              },
            } satisfies PlayerMove
            expect(isWinningMove(board, playerMove)).toEqual(
              expect.objectContaining({ isWin: true }),
            )
          })
        })
      })
    })
  })

  describe('given a board and the next players move', () => {
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
  })
})
