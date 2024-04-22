import { BoardCellProps } from "@/BoardCell";

const createColumnCells = (
  numberOfRows: number = 0,
  selectionStrategy: () => 1 | 2 | undefined = () => undefined,
): Array<BoardCellProps> => {
  return Array(numberOfRows)
    .fill(undefined)
    .map(() => ({ player: selectionStrategy(), id: crypto.randomUUID() }));
};

export default createColumnCells;
