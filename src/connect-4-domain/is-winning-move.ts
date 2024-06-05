import { Board, BoardCell, PlayerMove } from './game'

function isVerticalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board.length < 4) {
    return { isWin: false }
  }
  const threeCellsBelowPlayerMove = board.slice(
    playerMove.targetCell.row - 4,
    playerMove.targetCell.row - 1,
  )
  const isWin = threeCellsBelowPlayerMove.reduce(
    (isWinningMove: boolean, currentRow: Array<BoardCell>): boolean => {
      const column = playerMove.targetCell.column
      const player = playerMove.player
      return currentRow[column].player === player && isWinningMove
    },
    true,
  )
  return {
    isWin,
  }
}

function isHorizontalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board[0].length < 4 || playerMove.targetCell.column < 3) {
    return { isWin: false }
  }
  const player = playerMove.player
  const targetRow = playerMove.targetCell.row
  const targetColumn = playerMove.targetCell.column
  const isWin =
    board[targetRow][targetColumn - 1].player === player &&
    board[targetRow][targetColumn - 2].player === player &&
    board[targetRow][targetColumn - 3].player === player
  return { isWin }
}

function isWinningMove(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (isVerticalWin(board, playerMove).isWin) {
    return isVerticalWin(board, playerMove)
  } else if (isHorizontalWin(board, playerMove).isWin) {
    return isHorizontalWin(board, playerMove)
  } else {
    return { isWin: false }
  }
}

export default isWinningMove
