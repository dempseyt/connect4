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
    describe('with 1 column', () => {
      describe('containing a string', () => {
        it('and the string is empty', () => {
          const asciiTable = toAsciiTable([['']])
          expect(asciiTable).toStrictEqual(`
|--|
|  |
|--|`)
        })
        describe('with 1 character in length', () => {
          it('will return a string representing of the content in the cell', () => {
            const asciiTable = toAsciiTable([['1']])
            expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|`)
          })
        })
      })
    })
    describe('with content greater than 1 character in length', () => {
      it('returns a 1x1 ascii table', () => {
        const asciiTable = toAsciiTable([['10']])
        expect(asciiTable).toEqual(`
|----|
| 10 |
|----|`)
      })
      describe("containing 'undefined'", () => {
        it('returns a 1x1 ascii table', () => {
          const asciiTable = toAsciiTable([[undefined]])
          expect(asciiTable).toStrictEqual(`
|--|
|  |
|--|`)
        })
      })
    })
  })
})
