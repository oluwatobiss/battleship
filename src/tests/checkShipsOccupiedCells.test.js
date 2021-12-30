import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";

describe("Aircraft Carrier: Occupied Cells", () => {
    describe("Aircraft Carrier: Occupied Cell Numbers", () => {
        test("Aircraft Carrier: Horizontal Cell Numbers Occupied", () => {
            expect(checkShipsOccupiedCellNumbers(0, "Aircraft Carrier", "h")).toEqual([0, 1, 2, 3, 4]);
            expect(checkShipsOccupiedCellNumbers(35, "Aircraft Carrier", "h")).toEqual([35, 36, 37, 38, 39]);
            expect(checkShipsOccupiedCellNumbers(81, "Aircraft Carrier", "h")).toEqual([81, 82, 83, 84, 85]);
        });
    
        test("Aircraft Carrier: Vertical Cell Numbers Occupied", () => {
            expect(checkShipsOccupiedCellNumbers(0, "Aircraft Carrier", "v")).toEqual([0, 10, 20, 30, 40]);
            expect(checkShipsOccupiedCellNumbers(36, "Aircraft Carrier", "v")).toEqual([36, 46, 56, 66, 76]);
            expect(checkShipsOccupiedCellNumbers(51, "Aircraft Carrier", "v")).toEqual([51, 61, 71, 81, 91]);
        });
    });
    
    describe("Aircraft Carrier: Occupied Cell Coordinates", () => {
        test("Aircraft Carrier: Horizontal Cell Coordinates Occupied", () => {
            expect(checkShipsOccupiedCellCoordinates(0, "Aircraft Carrier", "h")).toEqual(["A1", "B1", "C1", "D1", "E1"]);
            expect(checkShipsOccupiedCellCoordinates(35, "Aircraft Carrier", "h")).toEqual(["F4", "G4", "H4", "I4", "J4"]);
            expect(checkShipsOccupiedCellCoordinates(81, "Aircraft Carrier", "h")).toEqual(["B9", "C9", "D9", "E9", "F9"]);
        });
    
        test("Aircraft Carrier: Vertical Cell Coordinates Occupied", () => {
            expect(checkShipsOccupiedCellCoordinates(0, "Aircraft Carrier", "v")).toEqual(["A1", "A2", "A3", "A4", "A5"]);
            expect(checkShipsOccupiedCellCoordinates(36, "Aircraft Carrier", "v")).toEqual(["G4", "G5", "G6", "G7", "G8"]);
            expect(checkShipsOccupiedCellCoordinates(51, "Aircraft Carrier", "v")).toEqual(["B6", "B7", "B8", "B9", "B10"]);
        });
    });
});

describe("Battleship: Occupied Cells", () => {
    describe("Battleship: Occupied Cell Numbers", () => {
        test("Battleship: Horizontal Cell Numbers Occupied", () => {
            expect(checkShipsOccupiedCellNumbers(0, "Battleship", "h")).toEqual([0, 1, 2, 3]);
            expect(checkShipsOccupiedCellNumbers(36, "Battleship", "h")).toEqual([36, 37, 38, 39]);
            expect(checkShipsOccupiedCellNumbers(81, "Battleship", "h")).toEqual([81, 82, 83, 84]);
        });
    
        test("Battleship: Vertical Cell Numbers Occupied", () => {
            expect(checkShipsOccupiedCellNumbers(0, "Battleship", "v")).toEqual([0, 10, 20, 30]);
            expect(checkShipsOccupiedCellNumbers(36, "Battleship", "v")).toEqual([36, 46, 56, 66]);
            expect(checkShipsOccupiedCellNumbers(61, "Battleship", "v")).toEqual([61, 71, 81, 91]);
        });
    });
    
    describe("Battleship: Occupied Cell Coordinates", () => {
        test("Battleship: Horizontal Cell Coordinates Occupied", () => {
            expect(checkShipsOccupiedCellCoordinates(0, "Battleship", "h")).toEqual(["A1", "B1", "C1", "D1"]);
            expect(checkShipsOccupiedCellCoordinates(36, "Battleship", "h")).toEqual(["G4", "H4", "I4", "J4"]);
            expect(checkShipsOccupiedCellCoordinates(81, "Battleship", "h")).toEqual(["B9", "C9", "D9", "E9"]);
        });
    
        test("Battleship: Vertical Cell Coordinates Occupied", () => {
            expect(checkShipsOccupiedCellCoordinates(0, "Battleship", "v")).toEqual(["A1", "A2", "A3", "A4"]);
            expect(checkShipsOccupiedCellCoordinates(36, "Battleship", "v")).toEqual(["G4", "G5", "G6", "G7"]);
            expect(checkShipsOccupiedCellCoordinates(61, "Battleship", "v")).toEqual(["B7", "B8", "B9", "B10"]);
        });
    });
});