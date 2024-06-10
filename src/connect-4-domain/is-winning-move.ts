import { Board, BoardCell, PlayerMove } from './game'

function getThreeDisksToLeftOfTargetCell(board: Board, playerMove: PlayerMove): Array<BoardCell> {
  const columnIndex = playerMove.targetCell.column
  const leftStartIndex = Math.max(columnIndex - 3, 0)
  return board[playerMove.targetCell.row].slice(leftStartIndex, columnIndex)
}

function getThreeDisksToRightOfTargetCell(board: Board, playerMove: PlayerMove): Array<BoardCell> {
  const columnIndex = playerMove.targetCell.column
  const rightEndIndex = Math.min(board[0].length, columnIndex + 3)
  return board[playerMove.targetCell.row].slice(columnIndex + 1, rightEndIndex)
}

function getIsCellOccupiedByPlayer(currentCell: BoardCell, activePlayer: 1 | 2): boolean {
  return currentCell.player === activePlayer
}

function isHorizontalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board[0].length < 3) {
    return { isWin: false }
  }
  const accumulatedCellsAroundTargetCell: Array<BoardCell> = [
    ...getThreeDisksToLeftOfTargetCell(board, playerMove),
    ...getThreeDisksToRightOfTargetCell(board, playerMove),
  ]
  const activePlayer = playerMove.player
  let count = 0
  const isWin = accumulatedCellsAroundTargetCell.reduce(
    (isWinningMove: boolean, currentCell: BoardCell): boolean => {
      getIsCellOccupiedByPlayer(currentCell, activePlayer) ? count++ : (count = 0)
      if (count === 3) return isWinningMove
      return !isWinningMove
    },
    true,
  )
  return { isWin }
}

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
