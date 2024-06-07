import { Board, BoardCell, PlayerMove } from './game'

function getTargetCell(playerMove: PlayerMove): { targetRow: number; targetColumn: number } {
  return {
    targetRow: playerMove.targetCell.row,
    targetColumn: playerMove.targetCell.column,
  }
}

function getThreeDisksToLeftOfTargetCell(
  board: Board,
  playerMove: PlayerMove,
): Array<number | undefined> {
  const { targetRow, targetColumn } = getTargetCell(playerMove)
  const distanceFromLeft = playerMove.targetCell.column
  switch (distanceFromLeft) {
    case 0: {
      return []
    }
    case 1:
      return [board[targetRow][targetColumn - 1].player]
    case 2:
      return [board[targetRow][targetColumn - 1].player, board[targetRow][targetColumn - 2].player]
    default:
      return [
        board[targetRow][targetColumn - 1].player,
        board[targetRow][targetColumn - 2].player,
        board[targetRow][targetColumn - 3].player,
      ]
  }
}

function getThreeDisksToRightOfTargetCell(
  board: Board,
  playerMove: PlayerMove,
): Array<number | undefined> {
  const { targetRow, targetColumn } = getTargetCell(playerMove)
  const onTheEdgeOfBoard = board[0].length - 1
  const oneFromTheEdgeOfBoard = board[0].length - 2
  const twoFromTheEdgeOfBoard = board[0].length - 3
  if (targetColumn === onTheEdgeOfBoard) {
    return []
  } else if (targetColumn === oneFromTheEdgeOfBoard) {
    return [board[targetRow][targetColumn + 1].player]
  } else if (targetColumn === twoFromTheEdgeOfBoard) {
    return [board[targetRow][targetColumn + 1].player, board[targetRow][targetColumn + 2].player]
  } else {
    return [
      board[targetRow][targetColumn + 1].player,
      board[targetRow][targetColumn + 2].player,
      board[targetRow][targetColumn + 3].player,
    ]
  }
}

function isHorizontalWin(board: Board, playerMove: PlayerMove): { isWin: boolean } {
  if (board[0].length < 3) {
    return { isWin: false }
  }
  const player = playerMove.player
  const threeDisksToLeftAndRightOfTargetCell: Array<number | undefined> = [
    ...getThreeDisksToLeftOfTargetCell(board, playerMove),
    ...getThreeDisksToRightOfTargetCell(board, playerMove),
  ]
  let count = 0
  const isWin = threeDisksToLeftAndRightOfTargetCell.reduce(
    (isWinningMove: boolean, currentCell: number | undefined): boolean => {
      if (currentCell === player) {
        count++
      } else {
        count = 0
      }
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
