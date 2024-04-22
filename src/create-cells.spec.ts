import { describe, it, expect } from "vitest";
import createCells from "@/create-cells";

describe("create-column-cells", () => {
  it("returns an empty column given defaults", () => {
    expect(createCells()).toEqual([]);
  });
  describe("given 1 row", () => {
    it("returns 1 column with 1 row", () => {
      expect(createCells(1, 1)).toEqual([
        expect.objectContaining([{ player: undefined, id: expect.toBeUuid() }]),
      ]);
    });
    describe("and a player selection strategy", () => {
      describe("that always selects player 1", () => {
        it("creates a single cell occupied by player 1", () => {
          const playerOneStrategy: () => 1 | 2 | undefined = () => 1;
          expect(createCells(1, 1, playerOneStrategy)).toEqual([
            expect.objectContaining([{ player: 1, id: expect.toBeUuid() }]),
          ]);
        });
      });
    });
  });
  describe("given a number of rows and columns greater than 1", () => {
    const matchDefaultCell = expect.objectContaining({
      player: undefined,
      id: expect.toBeUuid(),
    });
    it("returns a row by column size board", () => {
      expect(createCells(2, 2)).toEqual([
        [matchDefaultCell, matchDefaultCell],
        [matchDefaultCell, matchDefaultCell],
      ]);
    });
  });
});
