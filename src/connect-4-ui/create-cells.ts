import { BoardCellProps } from '@/connect-4-ui/BoardCell'
import { v4 } from 'uuid'

const createColumnCells = (
  numberOfRows: number = 0,
  numberOfColumns: number = 0,
  selectionStrategy: () => 1 | 2 | undefined = () => undefined,
): Array<Array<BoardCellProps>> => {
  return Array(numberOfRows)
    .fill(undefined)
    .map(
      (): Array<BoardCellProps> =>
        Array(numberOfColumns)
          .fill(undefined)
          .map(
            (): BoardCellProps => ({
              player: selectionStrategy(),
              id: v4(),
            }),
          ),
    )
}
// [undefined, undefined, undefined]
export default createColumnCells
