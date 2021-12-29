import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";

test("Ship's Occupied Cell Numbers", () => {
    expect(checkShipsOccupiedCellNumbers(0)).toEqual([0, 1, 2, 3]);
    expect(checkShipsOccupiedCellNumbers(36)).toEqual([36, 37, 38, 39]);
    expect(checkShipsOccupiedCellNumbers(81)).toEqual([81, 82, 83, 84]);
});

test("Ship's Occupied Cell Coordinates", () => {
    expect(checkShipsOccupiedCellCoordinates(0)).toEqual(["A1", "B1", "C1", "D1"]);
    expect(checkShipsOccupiedCellCoordinates(36)).toEqual(["G4", "H4", "I4", "J4"]);
    expect(checkShipsOccupiedCellCoordinates(81)).toEqual(["B9", "C9", "D9", "E9"]);
});