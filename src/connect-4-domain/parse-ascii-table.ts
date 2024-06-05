function defaultResolver(value: string): string | undefined {
  return value.length === 0 ? undefined : value
}

function parseAsciiTable<T>(
  asciiTable: string,
  customResolver: (value: string) => T = defaultResolver as (value: string) => T,
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

      const cellContent: string = rowCells[currentIndex].trimEnd().slice(1)
      grid.push([customResolver(cellContent)])

      return [...grid]
    },
    [],
  )
  return grid
}
export default parseAsciiTable
