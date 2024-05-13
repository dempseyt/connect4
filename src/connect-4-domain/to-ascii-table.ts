function createBoarder(boarderChar: string, width: number): string {
  return `|${boarderChar.repeat(width)}|`
}

function defaultResolver<T>(value: T): string {
  if (value === undefined || value === null) {
    return ``
  }
  return `${value}`
}

function toAsciiTable<T>(
  grid: Array<Array<T>>,
  cellResolver: (value: T) => string = defaultResolver,
): string {
  let characterWidth: number = 2
  const tableRows = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow, currentElement) => {
        const resolvedElement = cellResolver(currentElement)
        characterWidth += resolvedElement.length
        return tableRow.concat(`| ${resolvedElement} |`)
      }, ''),
    )
    return tableRows
  }, [] as Array<string>)

  let boarder: string = createBoarder('-', characterWidth)
  return grid.length !== 0 ? ['', boarder, tableRows[0], boarder].join('\n') : ''
}

export default toAsciiTable
