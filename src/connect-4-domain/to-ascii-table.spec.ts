import { describe, expect, it } from 'vitest'
import toAsciiTable from './to-ascii-table'
describe('to-ascii-table', () => {
  describe('given an empty grid', () => {
    it('will resolve to an empty ascii table', () => {
      const asciiTable = toAsciiTable([])
      expect(asciiTable).toStrictEqual('')
    })
  })
  describe('given a grid with 1 row', () => {
    describe('and 1 column', () => {
      describe('and a custom cell resolver', () => {
        it('it will use the custom cell resolver to resolve the value of the cell', () => {
          const customResolver = (value: any) => (value === null ? '💩' : 'YOZA')
          const asciiTable = toAsciiTable([[null]], customResolver)
          expect(asciiTable).toStrictEqual(`
|----|
| 💩 |
|----|`)
        })
      })
      describe('containing a string', () => {
        describe('and the string is empty', () => {
          it('returns a 1x1 ascii table', () => {
            const asciiTable = toAsciiTable([['']])
            expect(asciiTable).toStrictEqual(`
|--|
|  |
|--|`)
          })
        })
        describe('with 1 character in length', () => {
          it('returns a 1x1 ascii table', () => {
            const asciiTable = toAsciiTable([['1']])
            expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|`)
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
      })
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
    describe("containing 'null'", () => {
      it('returns a 1x1 ascii table', () => {
        const asciiTable = toAsciiTable([[null]])
        expect(asciiTable).toStrictEqual(`
|--|
|  |
|--|`)
      })
    })
    describe('and multiple columns', () => {
      describe('of the same length', () => {
        it('returns a ascii table with 1 row and multiple columns', () => {
          const asciiTable = toAsciiTable([[1, 1]])
          expect(asciiTable).toStrictEqual(`
|---|---|
| 1 | 1 |
|---|---|`)
        })
      })
      describe('of different lengths', () => {
        it('returns an ascii with 1 row and multiple column', () => {
          const asciiTable = toAsciiTable([[1, 10]])
          expect(asciiTable).toStrictEqual(`
|---|----|
| 1 | 10 |
|---|----|`)
        })
      })
    })
  })
  describe('given a grid with multiple rows', () => {
    describe('and 1 column', () => {
      describe('where the content of each column is of the same length', () => {
        it('returns a ascii table with multiple rows and 1 column', () => {
          const asciiTable = toAsciiTable([[1], [1]])
          expect(asciiTable).toStrictEqual(`
|---|
| 1 |
|---|
| 1 |
|---|`)
        })
      })
      describe('where the content of each column is of different lengths', () => {
        it('returns a ascii table with multiple rows and one column', () => {
          const asciiTable = toAsciiTable([[1], [11]])
          expect(asciiTable).toStrictEqual(`
|----|
| 1  |
|----|
| 11 |
|----|`)
        })
      })
    })
  })
})
