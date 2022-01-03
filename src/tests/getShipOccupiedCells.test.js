import { getShipOccupiedCellsNumbers, getShipOccupiedCellsCoordinates } from "../getShipOccupiedCells";

describe("Aircraft Carrier: Occupied Cells", () => {
    describe("Aircraft Carrier: Occupied Cell Numbers", () => {
        test("Aircraft Carrier: Horizontal Cell Numbers Occupied", () => {
            expect(getShipOccupiedCellsNumbers(0, "aircraftCarrier", "h")).toEqual([0, 1, 2, 3, 4]);
            expect(getShipOccupiedCellsNumbers(35, "aircraftCarrier", "h")).toEqual([35, 36, 37, 38, 39]);
            expect(getShipOccupiedCellsNumbers(81, "aircraftCarrier", "h")).toEqual([81, 82, 83, 84, 85]);
        });
    
        test("Aircraft Carrier: Vertical Cell Numbers Occupied", () => {
            expect(getShipOccupiedCellsNumbers(0, "aircraftCarrier", "v")).toEqual([0, 10, 20, 30, 40]);
            expect(getShipOccupiedCellsNumbers(36, "aircraftCarrier", "v")).toEqual([36, 46, 56, 66, 76]);
            expect(getShipOccupiedCellsNumbers(51, "aircraftCarrier", "v")).toEqual([51, 61, 71, 81, 91]);
        });
    });
    
    describe("Aircraft Carrier: Occupied Cell Coordinates", () => {
        test("Aircraft Carrier: Horizontal Cell Coordinates Occupied", () => {
            expect(getShipOccupiedCellsCoordinates(0, "aircraftCarrier", "h")).toEqual(["A1", "B1", "C1", "D1", "E1"]);
            expect(getShipOccupiedCellsCoordinates(35, "aircraftCarrier", "h")).toEqual(["F4", "G4", "H4", "I4", "J4"]);
            expect(getShipOccupiedCellsCoordinates(81, "aircraftCarrier", "h")).toEqual(["B9", "C9", "D9", "E9", "F9"]);
        });
    
        test("Aircraft Carrier: Vertical Cell Coordinates Occupied", () => {
            expect(getShipOccupiedCellsCoordinates(0, "aircraftCarrier", "v")).toEqual(["A1", "A2", "A3", "A4", "A5"]);
            expect(getShipOccupiedCellsCoordinates(36, "aircraftCarrier", "v")).toEqual(["G4", "G5", "G6", "G7", "G8"]);
            expect(getShipOccupiedCellsCoordinates(51, "aircraftCarrier", "v")).toEqual(["B6", "B7", "B8", "B9", "B10"]);
        });
    });
});

describe("Battleship: Occupied Cells", () => {
    describe("Battleship: Occupied Cell Numbers", () => {
        test("Battleship: Horizontal Cell Numbers Occupied", () => {
            expect(getShipOccupiedCellsNumbers(0, "battleship", "h")).toEqual([0, 1, 2, 3]);
            expect(getShipOccupiedCellsNumbers(36, "battleship", "h")).toEqual([36, 37, 38, 39]);
            expect(getShipOccupiedCellsNumbers(81, "battleship", "h")).toEqual([81, 82, 83, 84]);
        });
    
        test("Battleship: Vertical Cell Numbers Occupied", () => {
            expect(getShipOccupiedCellsNumbers(0, "battleship", "v")).toEqual([0, 10, 20, 30]);
            expect(getShipOccupiedCellsNumbers(36, "battleship", "v")).toEqual([36, 46, 56, 66]);
            expect(getShipOccupiedCellsNumbers(61, "battleship", "v")).toEqual([61, 71, 81, 91]);
        });
    });
    
    describe("Battleship: Occupied Cell Coordinates", () => {
        test("Battleship: Horizontal Cell Coordinates Occupied", () => {
            expect(getShipOccupiedCellsCoordinates(0, "battleship", "h")).toEqual(["A1", "B1", "C1", "D1"]);
            expect(getShipOccupiedCellsCoordinates(36, "battleship", "h")).toEqual(["G4", "H4", "I4", "J4"]);
            expect(getShipOccupiedCellsCoordinates(81, "battleship", "h")).toEqual(["B9", "C9", "D9", "E9"]);
        });
    
        test("Battleship: Vertical Cell Coordinates Occupied", () => {
            expect(getShipOccupiedCellsCoordinates(0, "battleship", "v")).toEqual(["A1", "A2", "A3", "A4"]);
            expect(getShipOccupiedCellsCoordinates(36, "battleship", "v")).toEqual(["G4", "G5", "G6", "G7"]);
            expect(getShipOccupiedCellsCoordinates(61, "battleship", "v")).toEqual(["B7", "B8", "B9", "B10"]);
        });
    });
});