import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";

test("Horizontal Battleship's Occupied Cell Numbers", () => {
    expect(checkShipsOccupiedCellNumbers(0, "h")).toEqual([0, 1, 2, 3]);
    expect(checkShipsOccupiedCellNumbers(36, "h")).toEqual([36, 37, 38, 39]);
    expect(checkShipsOccupiedCellNumbers(81, "h")).toEqual([81, 82, 83, 84]);
});

test("Horizontal Battleship's Occupied Cell Coordinates", () => {
    expect(checkShipsOccupiedCellCoordinates(0, "h")).toEqual(["A1", "B1", "C1", "D1"]);
    expect(checkShipsOccupiedCellCoordinates(36, "h")).toEqual(["G4", "H4", "I4", "J4"]);
    expect(checkShipsOccupiedCellCoordinates(81, "h")).toEqual(["B9", "C9", "D9", "E9"]);
});

test("Vertical Battleship's Occupied Cell Numbers", () => {
    expect(checkShipsOccupiedCellNumbers(0, "v")).toEqual([0, 10, 20, 30]);
    expect(checkShipsOccupiedCellNumbers(36, "v")).toEqual([36, 46, 56, 66]);
    expect(checkShipsOccupiedCellNumbers(61, "v")).toEqual([61, 71, 81, 91]);
});

test("Vertical Battleship's Occupied Cell Coordinates", () => {
    expect(checkShipsOccupiedCellCoordinates(0, "v")).toEqual(["A1", "A2", "A3", "A4"]);
    expect(checkShipsOccupiedCellCoordinates(36, "v")).toEqual(["G4", "G5", "G6", "G7"]);
    expect(checkShipsOccupiedCellCoordinates(61, "v")).toEqual(["B7", "B8", "B9", "B10"]);
});