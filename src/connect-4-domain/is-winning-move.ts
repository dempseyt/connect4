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
  const targetRow = playerMove.targetCell.row
  const startIndex = Math.max(targetRow - 3, 0)
  const upToThreeCellsBelowTargetCell = board.slice(startIndex, targetRow)
  if (upToThreeCellsBelowTargetCell.length < 3) {
    return { isWin: false }
  }
  const isWin = upToThreeCellsBelowTargetCell.reduce(
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

function isDiagonalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board.length < 4 || board[0].length < 4) {
    return { isWin: false }
  }
  const targetRow = playerMove.targetCell.row
  const targetColumn = playerMove.targetCell.column
  const activePlayer = playerMove.player
  const tokensToTheLeft = [
    board[targetRow - 1][targetColumn - 1],
    board[targetRow - 2][targetColumn - 2],
    board[targetRow - 3][targetColumn - 3],
  ]
  for (const currentCell of tokensToTheLeft) {
    if (currentCell.player !== activePlayer) {
      return { isWin: false }
    }
  }
  return { isWin: true }
}

function isWinningMove(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  return {
    isWin:
      isVerticalWin(board, playerMove).isWin ||
      isHorizontalWin(board, playerMove).isWin ||
      isDiagonalWin(board, playerMove).isWin,
  }
}

export default isWinningMove
