function createBoarder(borderChar: string, cellWidthPerColumn: Array<number>): string {
  return cellWidthPerColumn.reduce((borderString, width) => {
    return borderString.concat(borderChar.repeat(width + 2), '|')
  }, '|')
}

const defaultResolver = <T>(value: T): string =>
  value === undefined || value === null ? '' : `${value}`

function getLargestCharacterWidthPerColumn(grid: Array<Array<string>>): Array<number> {
  return grid.reduce((maxColumnWidths, currentRow) => {
    return currentRow.reduce((maxColumnWidths, cell, columnIndex) => {
      if (cell.length > maxColumnWidths[columnIndex]) {
        maxColumnWidths[columnIndex] = cell.length
      }
      return maxColumnWidths
    }, maxColumnWidths)
  }, Array(grid[0].length).fill(0))
}

function resolveGridCells<T>(
  grid: Array<Array<T>>,
  cellResolver: (value: T) => string = defaultResolver,
): Array<Array<string>> {
  return grid.map((row) => row.map((cell) => cellResolver(cell)))
}

function toAsciiTable<T>(
  grid: Array<Array<T>>,
  cellResolver: (value: T) => string = defaultResolver,
): string {
  if (grid.length === 0) {
    return ''
  }
  const resolvedGrid = resolveGridCells(grid, cellResolver)
  const largestCharacterWidthPerColumn = getLargestCharacterWidthPerColumn(resolvedGrid)
  const tableRows = resolvedGrid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow, currentElement) => {
        return tableRow.concat(` ${currentElement} |`)
      }, '|'),
    )
    return tableRows
  }, [] as Array<string>)
  let boarder: string = createBoarder('-', largestCharacterWidthPerColumn)
  return ['', boarder, tableRows[0], boarder].join('\n')
}

export default toAsciiTable
