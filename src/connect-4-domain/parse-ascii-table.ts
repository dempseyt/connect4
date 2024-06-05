function parseAsciiTable<T>(asciiTable: string): Array<Array<T>> {
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
        grid.push([rowCells[currentIndex].trim()])
      }
      return [...grid]
    },
    [],
  )
  return grid
}
export default parseAsciiTable
