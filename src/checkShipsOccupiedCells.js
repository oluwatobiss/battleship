import checkCellCoordinate from "./checkCellCoordinate";

function checkShipsOccupiedCellNumbers(num) {
    let shipHeadPosition = num;
    let shipCellsCoverageNumbers = [];

    for (let i = 0; i < 4; i++) {
        shipCellsCoverageNumbers.push(shipHeadPosition);
        shipHeadPosition += 1;
    }

    return shipCellsCoverageNumbers;
}

function checkShipsOccupiedCellCoordinates(num) {
    let shipHeadPosition = num;
    let shipCellsCoverageCoordinates = [];

    for (let i = 0; i < 4; i++) {
        shipCellsCoverageCoordinates.push(checkCellCoordinate(shipHeadPosition));
        shipHeadPosition += 1;
    }

    return shipCellsCoverageCoordinates;
}

export { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates };