function changeShipOrientation(e, ships, shipName, currentCellNum, cellCoord, getOccupiedCellsNums, occupiedCellsNums) {
    const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
    const shipOrientation = e.target.dataset.orientation;

    let shipData = null;
    let allShipsOccupiedCellsNums = null;
    let dblclickShipHeadCellNum = getOccupiedCellsNums(currentCellNum, shipName, shipOrientation)[0];
    let dblclickShipProposedCellsNums = [];
    let somePropCellsNotFree = false;

    (function getShipData() {
        for (const obj of ships) {
            if  (obj.name === shipName) {
                shipData = obj;
            }
        }
    })();

    (function getAllShipsOccupiedCellsNums() {
        allShipsOccupiedCellsNums = [...new Set([
            ...occupiedCellsNums.aircraftCarrier,
            ...occupiedCellsNums.battleship,
            ...occupiedCellsNums.cruiser,
            ...occupiedCellsNums.submarine,
            ...occupiedCellsNums.destroyer
        ])];
    })();

    (function removeDblclickShipHeadCellFromAllShipsOccCellsNumsArr() {
        console.log(dblclickShipHeadCellNum);
        allShipsOccupiedCellsNums = allShipsOccupiedCellsNums.filter(n => n !== dblclickShipHeadCellNum);
    })();

    function checkIfAllProposedShipCellsNumsAreFree() {
        for (let i = 0; i < dblclickShipProposedCellsNums.length; i++) {
            if (allShipsOccupiedCellsNums.includes(dblclickShipProposedCellsNums[i])) {
                somePropCellsNotFree = true;
                return;
            }
        }
    }

    if (shipOrientation === "h") {
        dblclickShipProposedCellsNums = getOccupiedCellsNums(currentCellNum, shipName, "v");
        checkIfAllProposedShipCellsNumsAreFree();

        if (currentCellNum < shipData.notHeadRows && somePropCellsNotFree === false) {
            e.target.dataset.orientation = "v";
            e.target.style.width = cellSize + "px";
            e.target.style.height = cellSize * shipData.length + "px";
            occupiedCellsNums[shipName] = dblclickShipProposedCellsNums;
        }
    } else {
        dblclickShipProposedCellsNums = getOccupiedCellsNums(currentCellNum, shipName, "h");
        checkIfAllProposedShipCellsNumsAreFree();
        
        if (!shipData.notHeadColumns.test(cellCoord(currentCellNum)) && somePropCellsNotFree === false) {
            e.target.dataset.orientation = "h";
            e.target.style.width = cellSize * shipData.length + "px";
            e.target.style.height = cellSize + "px";
            occupiedCellsNums[shipName] = dblclickShipProposedCellsNums;
        }
    }
}

export default changeShipOrientation;