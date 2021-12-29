import checkCellCoordinate from "./checkCellCoordinate";

function checkShipsOccupiedCellNumbers(num, orientation) {
    let shipHeadPosition = num;
    let shipCellsCoverageNumbers = [];

    for (let i = 0; i < 4; i++) {
        shipCellsCoverageNumbers.push(shipHeadPosition);
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageNumbers;
}

function checkShipsOccupiedCellCoordinates(num, orientation) {
    let shipHeadPosition = num;
    let shipCellsCoverageCoordinates = [];

    for (let i = 0; i < 4; i++) {
        shipCellsCoverageCoordinates.push(checkCellCoordinate(shipHeadPosition));
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageCoordinates;
}

export { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates };