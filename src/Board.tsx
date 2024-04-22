import { BoardCellProps } from "@/BoardCell";
import { BoardColumn  } from "@/BoardColumn";
import createCells from "@/create-column-cells"
import styled from "styled-components"

type BoardProps = {
    cells: Array<Array<BoardCellProps>>,
    className?: string
}

const StyledBoard = styled.div`
   display: flex;
   
`

export const Board = ({ cells, className }: BoardProps) => {
    const numberOfColumns = cells[0].length;
    let columns = [];
    for(let i = 0; i < numberOfColumns; i++) {
        columns.push(<BoardColumn key={i}/>)
    }
    return (
        <StyledBoard className={className}>
            {columns}
        </StyledBoard>
    )
} 

Board.defaultProps = {
    cells: createCells(6, 7)
}