import checkCellCoordinate from "./checkCellCoordinate";

function getShipOccupiedCellsNumbers(headCellNum, shipName, orientation) {
    let shipHeadPosition = headCellNum;
    let shipCellsCoverageNumbers = [];
    let shipLength = null;

    switch (shipName) {
        case "aircraftCarrier": shipLength = 5; break;
        case "battleship": shipLength = 4; break;
        case "cruiser": shipLength = 3; break;
        case "submarine": shipLength = 3; break;
        case "destroyer": shipLength = 2; break;
        default: console.error("Not a valid ship name");
    }

    for (let i = 0; i < shipLength; i++) {
        shipCellsCoverageNumbers.push(shipHeadPosition);
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageNumbers;
}

function getShipOccupiedCellsCoordinates(headCellNum, shipName, orientation) {
    let shipHeadPosition = headCellNum;
    let shipCellsCoverageCoordinates = [];
    let shipLength = null;

    switch (shipName) {
        case "aircraftCarrier": shipLength = 5; break;
        case "battleship": shipLength = 4; break;
        case "cruiser": shipLength = 3; break;
        case "submarine": shipLength = 3; break;
        case "destroyer": shipLength = 2; break;
        default: console.error("Not a valid ship name");
    }

    for (let i = 0; i < shipLength; i++) {
        shipCellsCoverageCoordinates.push(checkCellCoordinate(shipHeadPosition));
        orientation === "h" ? shipHeadPosition += 1 : shipHeadPosition += 10;
    }

    return shipCellsCoverageCoordinates;
}

export { getShipOccupiedCellsNumbers, getShipOccupiedCellsCoordinates };