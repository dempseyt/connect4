function parseAsciiTable(asciiTable: string): Array<Array<string | undefined>> {
  if (asciiTable.length === 0) {
    return []
  }
  const asciiTableRows = asciiTable.split('\n').slice(1)
  const grid = asciiTableRows.reduce(
    (
      grid: Array<Array<string | undefined>>,
      row: string,
      currentIndex: number,
    ): Array<Array<string | undefined>> => {
      if (currentIndex % 2 === 0) {
        return grid
      }
      const rowCells = row.split('|')
      if (rowCells[1].trim().length === 0) {
        grid.push([undefined])
      } else {
        grid.push([rowCells[currentIndex].trimEnd().slice(1)])
      }
      return [...grid]
    },
    [],
  )
  return grid
}
export default parseAsciiTable
