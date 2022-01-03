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
    
        let shipInitialCellNumber = getRandomNum();
        let usersWaterCell = null;
    
        ship.setAttribute("id", shipData.id);
        ship.setAttribute("data-orientation", shipOrientation);
        
        if (shipOrientation === "h") {
            ship.style.width = cellSize * shipData.length + "px";
            ship.style.height = cellSize + "px";
    
            while (shipData.notHeadColumns.test(cellCoord(shipInitialCellNumber))) {
                console.error("Horizontal: " + cellCoord(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            occupiedCellsNums[shipData.name] = getOccupiedCellsNums(shipInitialCellNumber, shipData.name, "h");
            occupiedCellsCoords[shipData.name] = getOccupiedCellsCoords(shipInitialCellNumber, shipData.name, "h");
        } else {
            ship.style.width = cellSize + "px";
            ship.style.height = cellSize * shipData.length + "px";
    
            while (shipInitialCellNumber >= shipData.notHeadRows) {
                console.error("Vertical: " + cellCoord(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
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
        console.log(occupiedCellsNums);
        console.log(occupiedCellsCoords);
    });
}

export default placeShipsInUsersWater;