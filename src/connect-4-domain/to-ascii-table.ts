function createBoarder(boarderChar: string, width: number): string {
  return `|${boarderChar.repeat(width)}|`
}

function toAsciiTable(grid: Array<Array<string | undefined | null>>): string {
  let characterWidth: number = 2
  const tableRows = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow: string, currentElement) => {
        if (currentElement === undefined || currentElement === null) {
          return tableRow.concat(`|  |`)
        }

        characterWidth += currentElement.length
        return tableRow.concat(`| ${currentElement} |`)
      }, ''),
    )
    return tableRows
  }, [])

  let boarder: string = createBoarder('-', characterWidth)
  return grid.length !== 0 ? ['', boarder, tableRows[0], boarder].join('\n') : ''
}

export default toAsciiTable
