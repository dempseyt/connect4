import { BoardCell, BoardCellProps } from '@/connect-4-ui/BoardCell'
import createCells from '@/connect-4-ui/create-cells'
import styled from 'styled-components'

export type ClickHandler = (row: number, column: number) => void

export type BoardProps = {
  cells?: Array<Array<BoardCellProps>>
  onClick?: ClickHandler
}

type GridCellProps = {
  rowIndex: number
  columnIndex: number
}

const StyledBoard = styled.div<{ $cells: BoardProps['cells'] }>`
  display: grid;
  border: 3px solid darkblue;
  grid-template-columns: ${({ $cells }) =>
    `repeat(${($cells as BoardCellProps[][])[0].length}, 1fr)`};
  grid-template-rows: ${({ $cells }) => `repeat(${($cells as BoardCellProps[][]).length}, 1fr)`};
  height: min(80vh, 80vw);
  width: min(80vh, 80vw);
`

const GridElement = styled(BoardCell)<{
  $rowIndex: GridCellProps['rowIndex']
  $columnIndex: GridCellProps['columnIndex']
}>`
  grid-row-start: ${({ $rowIndex }) => $rowIndex};
  grid-column-start: ${({ $columnIndex }) => $columnIndex};
`
function createHandleBoardCellClick(
  { rowIndex, columnIndex }: GridCellProps,
  onClick: ClickHandler,
) {
  return function handleBoardCellClick() {
    onClick(rowIndex, columnIndex)
  }
}

export const Board = ({ cells = createCells(6, 7), onClick = () => {} }: BoardProps) => {
  return (
    <StyledBoard $cells={cells} key={crypto.randomUUID()}>
      {cells.flatMap((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <GridElement
            onClick={createHandleBoardCellClick({ rowIndex, columnIndex }, onClick)}
            key={cell.id}
            $rowIndex={cells.length - rowIndex}
            $columnIndex={columnIndex + 1}
            player={cell.player}
            id={cell.id}
          />
        )),
      )}
    </StyledBoard>
  )
}
