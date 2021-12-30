import checkCellCoordinate from "./checkCellCoordinate";

function checkShipsOccupiedCellNumbers(headCellNum, shipName, orientation) {
    let shipHeadPosition = headCellNum;
    let shipCellsCoverageNumbers = [];
    let shipLength = null;

    switch (shipName) {
        case "Aircraft Carrier": shipLength = 5; break;
        case "Battleship": shipLength = 4; break;
        case "Cruiser": shipLength = 3; break;
        case "Submarine": shipLength = 3; break;
        case "Destroyer": shipLength = 2; break;
        default: console.error("Not a valid ship name");
    }

    for (let i = 0; i < shipLength; i++) {
        shipCellsCoverageNumbers.push(shipHeadPosition);
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageNumbers;
}

function checkShipsOccupiedCellCoordinates(headCellNum, shipName, orientation) {
    let shipHeadPosition = headCellNum;
    let shipCellsCoverageCoordinates = [];
    let shipLength = null;

    switch (shipName) {
        case "Aircraft Carrier": shipLength = 5; break;
        case "Battleship": shipLength = 4; break;
        case "Cruiser": shipLength = 3; break;
        case "Submarine": shipLength = 3; break;
        case "Destroyer": shipLength = 2; break;
        default: console.error("Not a valid ship name");
    }

    for (let i = 0; i < shipLength; i++) {
        shipCellsCoverageCoordinates.push(checkCellCoordinate(shipHeadPosition));
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageCoordinates;
}

export { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates };