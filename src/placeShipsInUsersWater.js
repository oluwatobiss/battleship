function placeShipsInUsersWater(ships, cellCoord, occupiedCellNums, occupiedCellCoords, airCurrCell, batCurrCell, cruCurrCell, subCurrCell, desCurrCell) {
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
    
            console.log(occupiedCellNums(shipInitialCellNumber, shipData.name, "h"));
            console.log(occupiedCellCoords(shipInitialCellNumber, shipData.name, "h"));
        } else {
            ship.style.width = cellSize + "px";
            ship.style.height = cellSize * shipData.length + "px";
    
            while (shipInitialCellNumber >= shipData.notHeadRows) {
                console.error("Vertical: " + cellCoord(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            console.log(occupiedCellNums(shipInitialCellNumber, shipData.name, "v"));
            console.log(occupiedCellCoords(shipInitialCellNumber, shipData.name, "v"));
        }

        switch (shipData.name) {
            case "Aircraft Carrier": airCurrCell.num = shipInitialCellNumber; break;
            case "Battleship": batCurrCell.num = shipInitialCellNumber; break;
            case "Cruiser": cruCurrCell.num = shipInitialCellNumber; break;
            case "Submarine": subCurrCell.num = shipInitialCellNumber; break;
            case "Destroyer": desCurrCell.num = shipInitialCellNumber; break;
            default: console.error("Not a valid ship name");
        }

        usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
        
        usersWaterCell.appendChild(ship);
    });
}

export default placeShipsInUsersWater;