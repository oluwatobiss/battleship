function placeShipsInUsersWater(
    ships, 
    cellCoord, 
    getOccupiedCellsNums, 
    getOccupiedCellsCoords, 
    airCurrCell, 
    batCurrCell, 
    cruCurrCell, 
    subCurrCell, 
    desCurrCell,
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

        // console.log(occupiedCells);
    
        let shipInitialCellNumber = getRandomNum();
        let proposedShipCellsNums = [shipInitialCellNumber];
        let usersWaterCell = null;
        let somePropCellsNotFree = false;
    
        ship.setAttribute("id", shipData.id);
        ship.setAttribute("data-orientation", shipOrientation);

        function setProposedShipCellsNums(num) {
            for (let i = 1; i < shipData.length; i++) {
                proposedShipCellsNums.push(proposedShipCellsNums[i - 1] + num);
            }
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
            ship.style.width = cellSize * shipData.length + "px";
            ship.style.height = cellSize + "px";
    
            setProposedShipCellsNums(1);
            checkIfAllProposedShipCellsNumsAreFree();

            while (shipData.notHeadColumns.test(cellCoord(shipInitialCellNumber)) || somePropCellsNotFree) {
                console.error("Horizontal Cell In Use: " + somePropCellsNotFree);
                console.error("Horizontal Cell In Use: " + shipInitialCellNumber);
                console.error("Horizontal: " + cellCoord(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
                proposedShipCellsNums = [shipInitialCellNumber];
                somePropCellsNotFree = false;
                setProposedShipCellsNums(1);
                checkIfAllProposedShipCellsNumsAreFree();
            }
    
            occupiedCellsNums[shipData.name] = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, "h");
            occupiedCellsCoords[shipData.name] = getOccupiedCellsCoords(shipInitialCellNumber, shipData.name, "h");
        } else {
            ship.style.width = cellSize + "px";
            ship.style.height = cellSize * shipData.length + "px";
    
            setProposedShipCellsNums(10);
            checkIfAllProposedShipCellsNumsAreFree();

            while (shipInitialCellNumber >= shipData.notHeadRows || somePropCellsNotFree) {
                console.error("Vertical Cell In Use: " + somePropCellsNotFree);
                console.error("Vertical Cell In Use: " + shipInitialCellNumber);
                console.error("Vertical: " + cellCoord(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
                proposedShipCellsNums = [shipInitialCellNumber];
                somePropCellsNotFree = false;
                setProposedShipCellsNums(10);
                checkIfAllProposedShipCellsNumsAreFree();
            }
    
            occupiedCellsNums[shipData.name] = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, "v");
            occupiedCellsCoords[shipData.name] = getOccupiedCellsCoords(shipInitialCellNumber, shipData.name, "v");
        }

        switch (shipData.name) {
            case "aircraftCarrier": airCurrCell.num = shipInitialCellNumber; break;
            case "battleship": batCurrCell.num = shipInitialCellNumber; break;
            case "cruiser": cruCurrCell.num = shipInitialCellNumber; break;
            case "submarine": subCurrCell.num = shipInitialCellNumber; break;
            case "destroyer": desCurrCell.num = shipInitialCellNumber; break;
            default: console.error("Not a valid ship name");
        }

        usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
        usersWaterCell.appendChild(ship);
        // console.log(occupiedCellsNums);
        // console.log(occupiedCellsCoords);
        // console.log(occupiedCells);
    });
}

export default placeShipsInUsersWater;