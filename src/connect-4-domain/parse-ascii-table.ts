function parseAsciiTable(asciiTable: string): any[][] {
  if (asciiTable.length === 0) {
    return []
  }
  const asciiTableRows = asciiTable.split('\n').slice(1)
  const grid = asciiTableRows.reduce(
    (grid: any[][], row: string, currentIndex: number): any[][] => {
      if (currentIndex % 2 === 0) {
        return grid
      }
      const rowCells = row.split('|')
      if (rowCells[1].trim().length === 0) {
        grid.push([undefined])
      }
      return [...grid]
    },
    [],
  )
  return grid
}
export default parseAsciiTable
