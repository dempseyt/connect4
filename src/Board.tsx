import { BoardCell, BoardCellProps } from "@/BoardCell";
import createCells from "@/create-cells"
import styled from "styled-components"

type BoardProps = {
    cells: Array<Array<BoardCellProps>>,
}

type GridCellProps = {
    rowIndex: number,
    columnIndex: number
}

const StyledBoard = styled.div`
   display: grid;
   grid-auto-rows: max-content;
   grid-auto-columns: max-content;
`

const GridElement = styled(BoardCell)<GridCellProps>`
    grid-row-start: ${(props) => props.rowIndex};
    grid-column-start: ${(props) => props.columnIndex};
`


export const Board = ({ cells }: BoardProps) => {
    return (
        <StyledBoard> 
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