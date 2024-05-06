import { BoardCell, BoardCellProps } from "@/connect-4-ui/BoardCell";
import createCells from "@/connect-4-ui/create-cells"
import styled from "styled-components"

export type BoardProps = {
    cells: Array<Array<BoardCellProps>>,
}

type GridCellProps = {
    rowIndex: number,
    columnIndex: number
}

const StyledBoard = styled.div<BoardProps>`
   display: grid;
   grid-template-columns: ${({cells}) => `repeat(${cells[0].length}, 1fr)`}; 
   grid-template-rows: ${({cells}) => `repeat(${cells.length}, 1fr)`}; 
   height: min(80vh, 80vw);
   width: min(80vh, 80vw);
`

const GridElement = styled(BoardCell)<GridCellProps>`
    grid-row-start: ${(props) => props.rowIndex};
    grid-column-start: ${(props) => props.columnIndex};
`


export const Board = ({ cells }: BoardProps) => {
    return (
        <StyledBoard cells={cells}> 
            {cells.flatMap((row, rowIndex) => 
                row.map((cell, columnIndex) => 
                    <GridElement 
                        key={cell.id}
                        rowIndex={rowIndex + 1} 
                        columnIndex={columnIndex + 1} 
                        player={cell.player} 
                        id={cell.id}
                    />)
            )}
        </StyledBoard>
    )
} 

Board.defaultProps = {
    cells: createCells(6, 7)
}