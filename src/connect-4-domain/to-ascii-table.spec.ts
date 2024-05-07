import { describe, expect, it } from 'vitest'
import toAsciiTable from './to-ascii-table'
describe('to-ascii-table', () => {
  describe('given an empty grid', () => {
    it('will resolve to an empty ascii table', () => {
      const asciiTable = toAsciiTable([])
      expect(asciiTable).toStrictEqual('')
    })
  })
  describe('given a 1x1 grid', () => {
    it('will return a string representing of the content in the cell', () => {
      const asciiTable = toAsciiTable([])
      expect(asciiTable).toStrictEqual(`
        |---|
        | 1 |
        |---|
        `)
    })
  })
})
