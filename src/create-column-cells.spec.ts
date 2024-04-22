import { describe, it, expect } from "vitest";
import createColumnCells from "@/create-column-cells";

describe("create-column-cells", () => {
  it("returns an empty column given defaults", () => {
    expect(createColumnCells()).toEqual([]);
  });
  describe("given 1 row", () => {
    it("returns 1 column with 1 row", () => {
      expect(createColumnCells(1)).toEqual([
        expect.objectContaining({ player: undefined, id: expect.toBeUuid() }),
      ]);
    });
    describe("and a player selection strategy", () => {
      describe("that always selects player 1", () => {
        it("creates a single cell occupied by player 1", () => {
          const playerOneStrategy: () => 1 | 2 | undefined = () => 1;
          expect(createColumnCells(1, playerOneStrategy)).toEqual([
            expect.objectContaining({ player: 1, id: expect.toBeUuid() }),
          ]);
        });
      });
    });
  });
  describe("given a number of rows greater than 1", () => {
    it("returns a column with multiple rows", () => {
      expect(createColumnCells(3)).toEqual([
        expect.objectContaining({ player: undefined, id: expect.toBeUuid() }),
        expect.objectContaining({ player: undefined, id: expect.toBeUuid() }),
        expect.objectContaining({ player: undefined, id: expect.toBeUuid() }),
      ]);
    });
  });
});
