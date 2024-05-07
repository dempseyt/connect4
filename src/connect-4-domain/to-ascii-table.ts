function toAsciiTable(grid: Array<Array<string>>): string {
  let characterWidth: number = 2
  const boarderChar: string = '-'
  const table = grid.reduce((tableRows, currentRow) => {
    tableRows.push(
      currentRow.reduce((tableRow, currentElement): string => {
        characterWidth += currentElement.length
        return tableRow.concat(`| ${currentElement} |`)
      }, ''),
    )
    return tableRows
  }, [])

  return grid.length !== 0
    ? [
        '',
        `|${boarderChar.repeat(characterWidth)}|`,
        table[0],
        `|${boarderChar.repeat(characterWidth)}|`,
      ].join('\n')
    : ''
}

export default toAsciiTable
