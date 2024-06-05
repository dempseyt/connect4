function parseAsciiTable<T>(
  asciiTable: string,
  customResolver: (value: string) => T = (value: string) => value as T,
): Array<Array<T>> {
  if (asciiTable.length === 0) {
    return []
  }
  const asciiTableRows = asciiTable.split('\n').slice(1)
  const grid = asciiTableRows.reduce(
    (grid: Array<Array<T>>, row: string, currentIndex: number): Array<Array<T>> => {
      if (currentIndex % 2 === 0) {
        return grid
      }
      const rowCells = row.split('|')
      if (rowCells[1].trim().length === 0) {
        grid.push([undefined as T])
      } else {
        const cellContent: string = rowCells[currentIndex].trimEnd().slice(1)
        grid.push([customResolver(cellContent)])
      }
      return [...grid]
    },
    [],
  )
  return grid
}
export default parseAsciiTable
