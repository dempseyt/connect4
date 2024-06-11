import { Board, BoardCell, PlayerMove } from './game'

function getThreeDisksHorizontallyToLeftOfTargetCell(
  board: Board,
  playerMove: PlayerMove,
): Array<BoardCell> {
  const columnIndex = playerMove.targetCell.column
  const leftStartIndex = Math.max(columnIndex - 3, 0)
  return board[playerMove.targetCell.row].slice(leftStartIndex, columnIndex)
}

function getThreeDisksHorizontallyToRightOfTargetCell(
  board: Board,
  playerMove: PlayerMove,
): Array<BoardCell> {
  const columnIndex = playerMove.targetCell.column
  const rightEndIndex = Math.min(board[0].length, columnIndex + 3)
  return board[playerMove.targetCell.row].slice(columnIndex + 1, rightEndIndex + 1)
}

function getIsCellOccupiedByPlayer(currentCell: BoardCell, activePlayer: 1 | 2): boolean {
  return currentCell.player === activePlayer
}

function isHorizontalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board[0].length < 3) {
    return { isWin: false }
  }
  const accumulatedCellsAroundTargetCell: Array<BoardCell> = [
    ...getThreeDisksHorizontallyToLeftOfTargetCell(board, playerMove),
    ...getThreeDisksHorizontallyToRightOfTargetCell(board, playerMove),
  ]
  const activePlayer = playerMove.player
  let count = 0
  for (const cell of accumulatedCellsAroundTargetCell) {
    if (cell.player === activePlayer) {
      count++
      if (count === 3) break
    } else {
      count = 0
    }
  }
  return { isWin: count === 3 }
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

function getTargetCell(playerMove: PlayerMove) {
  const {
    targetCell: { row, column },
  } = playerMove
  return { row, column }
}

function getThreeDisksDiagonallyLeftDownFromTargetCell(board: Board, playerMove: PlayerMove) {
  const { row: targetRow, column: targetColumn } = getTargetCell(playerMove)
  const lowestValidIndex = Math.max(Math.max(targetColumn - 3, targetRow - 3), 0)
  const numberOfCellsBackFromTargetCell = targetColumn - lowestValidIndex
  switch (numberOfCellsBackFromTargetCell) {
    case 0:
      return []
    case 1:
      return [board[targetRow - 1][targetColumn - 1]]
    case 2:
      return [board[targetRow - 1][targetColumn - 1], board[targetRow - 2][targetColumn - 2]]
    default:
      return [
        board[targetRow - 1][targetColumn - 1],
        board[targetRow - 2][targetColumn - 2],
        board[targetRow - 3][targetColumn - 3],
      ]
  }
}

function getThreeDisksDiagonallyRightUpFromTargetCell(board: Board, playerMove: PlayerMove) {
  const { row: targetRow, column: targetColumn } = getTargetCell(playerMove)
  const horizontalDimension = Math.min(board[0].length - 1, targetColumn + 3) - targetColumn
  const verticalDimension = Math.min(board.length - 1, targetRow + 3) - targetRow
  const numberOfCellsForwardFromTargetCell = Math.min(horizontalDimension, verticalDimension)
  switch (numberOfCellsForwardFromTargetCell) {
    case 0:
      return []
    case 1:
      return [board[targetRow + 1][targetColumn + 1]]
    case 2:
      return [board[targetRow + 1][targetColumn + 1], board[targetRow + 2][targetColumn + 2]]
    default:
      return [
        board[targetRow + 1][targetColumn + 1],
        board[targetRow + 2][targetColumn + 2],
        board[targetRow + 3][targetColumn + 3],
      ]
  }
}

function isDiagonalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board.length < 4 || board[0].length < 4) {
    return { isWin: false }
  }
  const activePlayer = playerMove.player
  const threeDisksDiagonallyLeftDownFromTargetCell = getThreeDisksDiagonallyLeftDownFromTargetCell(
    board,
    playerMove,
  )
  const threeDisksDiagonallyRightUpFromTargetCell = getThreeDisksDiagonallyRightUpFromTargetCell(
    board,
    playerMove,
  )
  const bottomLeftTopRight = [
    ...threeDisksDiagonallyLeftDownFromTargetCell,
    ...threeDisksDiagonallyRightUpFromTargetCell,
  ]

  let count = 0
  for (const cell of bottomLeftTopRight) {
    if (cell.player === activePlayer) {
      count++
      if (count === 3) break
    } else {
      count = 0
    }
  }

  return { isWin: count === 3 }
}

function isWinningMove(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  // console.log(
  //   isVerticalWin(board, playerMove).isWin,
  //   isHorizontalWin(board, playerMove).isWin,
  //   isDiagonalWin(board, playerMove).isWin,
  // )
  return {
    isWin:
      isVerticalWin(board, playerMove).isWin ||
      isHorizontalWin(board, playerMove).isWin ||
      isDiagonalWin(board, playerMove).isWin,
  }
}

export default isWinningMove
