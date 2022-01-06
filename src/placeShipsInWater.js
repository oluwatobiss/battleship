function placeShipsInWater(
    owner,
    ships, 
    cellCoord, 
    getOccupiedCellsNums, 
    getOccupiedCellsCoords, 
    airCurrHeadCell, 
    batCurrHeadCell, 
    cruCurrHeadCell, 
    subCurrHeadCell, 
    desCurrHeadCell,
    occupiedCellsNums,
    occupiedCellsCoords
    ) {
    ships.forEach(shipData => {        
        const ship = document.createElement('div');
        const getRandomNum = () => Math.floor(Math.random() * 100);
        const shipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
        const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
        const occupiedCells = [...new Set([
            ...occupiedCellsNums.aircraftCarrier,
            ...occupiedCellsNums.battleship,
            ...occupiedCellsNums.cruiser,
            ...occupiedCellsNums.submarine,
            ...occupiedCellsNums.destroyer
        ])];
    
        let shipInitialCellNumber = getRandomNum();
        let proposedShipCellsNums = [];
        let somePropCellsNotFree = false;
        let usersWaterCell = null;
    
        if (owner === "user") {
            ship.setAttribute("id", shipData.id);
            ship.setAttribute("data-orientation", shipOrientation);
        }

        function checkIfAllProposedShipCellsNumsAreFree() {
            for (let i = 0; i < proposedShipCellsNums.length; i++) {
                if (occupiedCells.includes(proposedShipCellsNums[i])) {
                    somePropCellsNotFree = true;
                    return;
                }
            }
        }
        
        if (shipOrientation === "h") {
            if (owner === "user") {
                ship.style.width = cellSize * shipData.length + "px";
                ship.style.height = cellSize + "px";
            }
            
            proposedShipCellsNums = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
            checkIfAllProposedShipCellsNumsAreFree();

            while (shipData.notHeadColumns.test(cellCoord(shipInitialCellNumber)) || somePropCellsNotFree) {
                console.error("Horizontal Cell In Use: " + somePropCellsNotFree);
                console.error("Horizontal Cell In Use: " + shipInitialCellNumber);
                console.error("Horizontal: " + cellCoord(shipInitialCellNumber));

                somePropCellsNotFree = false;
                shipInitialCellNumber = getRandomNum();
                proposedShipCellsNums = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
                checkIfAllProposedShipCellsNumsAreFree();
            }
    
            occupiedCellsNums[shipData.name] = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
            occupiedCellsCoords[shipData.name] = getOccupiedCellsCoords(shipInitialCellNumber, shipData.name, shipOrientation);
        } else {
            if (owner === "user") {
                ship.style.width = cellSize + "px";
                ship.style.height = cellSize * shipData.length + "px";
            }

            proposedShipCellsNums = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
            checkIfAllProposedShipCellsNumsAreFree();

            while (shipInitialCellNumber >= shipData.notHeadRows || somePropCellsNotFree) {
                console.error("Vertical Cell In Use: " + somePropCellsNotFree);
                console.error("Vertical Cell In Use: " + shipInitialCellNumber);
                console.error("Vertical: " + cellCoord(shipInitialCellNumber));

                somePropCellsNotFree = false;
                shipInitialCellNumber = getRandomNum();
                proposedShipCellsNums = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
                checkIfAllProposedShipCellsNumsAreFree();
            }
    
            occupiedCellsNums[shipData.name] = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, shipOrientation);
            occupiedCellsCoords[shipData.name] = getOccupiedCellsCoords(shipInitialCellNumber, shipData.name, shipOrientation);
        }

        switch (shipData.name) {
            case "aircraftCarrier": airCurrHeadCell.num = shipInitialCellNumber; break;
            case "battleship": batCurrHeadCell.num = shipInitialCellNumber; break;
            case "cruiser": cruCurrHeadCell.num = shipInitialCellNumber; break;
            case "submarine": subCurrHeadCell.num = shipInitialCellNumber; break;
            case "destroyer": desCurrHeadCell.num = shipInitialCellNumber; break;
            default: console.error("Not a valid ship name");
        }

        if (owner === "user") {
            usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
            usersWaterCell.appendChild(ship);
        }

        console.log(owner + "'s " + shipData.name + ": " + occupiedCellsNums[shipData.name]);
    });
}

export default placeShipsInWater;