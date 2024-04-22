import { BoardCell, BoardCellProps } from "@/BoardCell";
import createCells from "@/create-column-cells";

export type BoardColumnProps = {
    columnCells: Array<BoardCellProps> 
}


export const BoardColumn = ( { columnCells }: BoardColumnProps ) => {
    return <div>
        {columnCells.map((boardCellProps) => {
            return <BoardCell {...boardCellProps}/>
        })}
    </div>
}

BoardColumn.defaultProps = {
    columnCells: createCells(6)
}