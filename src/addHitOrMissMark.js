function addHitOrMissMark(cellOwner, cell, occupiedCellsNums, shipsInDockingArea, ships, shipToSink, checkCellCoordinate, userCellsShot) {
    const cellFired = cellOwner === "pc" ? Number(cell.id.slice(8)) : Number(cell.id.slice(10));
    const shipsOccupiedCells = [...new Set([
        ...occupiedCellsNums.aircraftCarrier,
        ...occupiedCellsNums.battleship,
        ...occupiedCellsNums.cruiser,
        ...occupiedCellsNums.submarine,
        ...occupiedCellsNums.destroyer
    ])];

    function resetShipToSinkObj() {
        shipToSink.withinAreaFired = false;
        shipToSink.numOfAttempts = 1;
        shipToSink.refCell = null;
        shipToSink.nextCellToShoot = null;
        shipToSink.shootDirection = null;
        shipToSink.shipSunk = false;
    }

    if (shipsOccupiedCells.includes(cellFired)) {
        cell.style.backgroundColor = "#fd5e53";
        // Loop through each ship's name in the occupiedCellsNums array:
        for (const shipName in occupiedCellsNums) {
            // Find the name of the ship that was fired:
            if (occupiedCellsNums[shipName].includes(cellFired)) {
                // Loop through the ships in the ships array:
                for (let i = 0; i < ships.length; i++) {
                    // Reduce the fired ship's life:
                    if (ships[i].name === shipName) {
                        ships[i].life -= 1;
                        // Notify if the fired ship has been sunk:
                        if ((cellOwner === "pc") && (ships[i].life === 0)) {
                            shipsInDockingArea[i].style.backgroundColor = "#fd5e53";
                        }
                        if ((cellOwner === "user") && (ships[i].life === 0)) {
                            shipToSink.shipSunk = true;
                            shipsInDockingArea[i].style.backgroundColor = "#fd5e53";
                        }
                    }
                }
            }
        }

        if (cellOwner === "user") {
            shipToSink.withinAreaFired = true;
            if (shipToSink.numOfAttempts === 1) {
                shipToSink.refCell = cellFired;
                if ((!checkCellCoordinate(cellFired).includes("J"))) {
                    if (!userCellsShot.includes(cellFired + 1)) {
                        shipToSink.nextCellToShoot = cellFired + 1;
                        shipToSink.shootDirection = "r";
                    } else if (!userCellsShot.includes(cellFired - 1) && !checkCellCoordinate(cellFired).includes("A")) {
                        shipToSink.nextCellToShoot = cellFired - 1;
                        shipToSink.shootDirection = "l";
                    } else if (!userCellsShot.includes(cellFired - 10) && ((cellFired - 10) >= 0)) {
                        shipToSink.nextCellToShoot = cellFired - 10;
                        shipToSink.shootDirection = "u";
                    } else if (!userCellsShot.includes(cellFired + 10) && ((cellFired + 10) <= 99)) {
                        shipToSink.nextCellToShoot = cellFired + 10;
                        shipToSink.shootDirection = "d";
                    }
                } else if ((checkCellCoordinate(cellFired).includes("J"))) {
                    if (!userCellsShot.includes(cellFired - 1)) {                        
                        shipToSink.nextCellToShoot = cellFired - 1;
                        shipToSink.shootDirection = "l";
                    } else if (!userCellsShot.includes(cellFired - 10) && ((cellFired - 10) >= 0)) {                        
                        shipToSink.nextCellToShoot = cellFired - 10;
                        shipToSink.shootDirection = "u";
                    } else if (!userCellsShot.includes(cellFired + 10) && ((cellFired + 10) <= 99)) {                        
                        shipToSink.nextCellToShoot = cellFired + 10;
                        shipToSink.shootDirection = "d";
                    }
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "r")) {
                if ((!checkCellCoordinate(cellFired).includes("J")) && (!userCellsShot.includes(cellFired + 1))) {
                    shipToSink.nextCellToShoot = cellFired + 1;
                } else if (!userCellsShot.includes(shipToSink.refCell - 1)) {
                    if (checkCellCoordinate(cellFired).includes("J") || userCellsShot.includes(cellFired + 1)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell - 1;
                        shipToSink.shootDirection = "l";
                    }
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "l")) {
                if ((!checkCellCoordinate(cellFired).includes("A")) && (!userCellsShot.includes(cellFired - 1))) {
                    shipToSink.nextCellToShoot = cellFired - 1;
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "u")) {
                if (((cellFired - 10) >= 0) && (!userCellsShot.includes(cellFired - 10))) {
                    shipToSink.nextCellToShoot = cellFired - 10;
                } else if (((cellFired - 10) <= 0) && (!userCellsShot.includes(shipToSink.refCell + 10))) {
                    shipToSink.nextCellToShoot = shipToSink.refCell + 10;
                    shipToSink.shootDirection = "d";
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "d")) {
                if (((cellFired + 10) <= 99) && (!userCellsShot.includes(cellFired + 10))) {
                    shipToSink.nextCellToShoot = cellFired + 10;
                }
            }

            shipToSink.numOfAttempts += 1;
            shipToSink.shipSunk && resetShipToSinkObj();
        }
    }
    
    if (!shipsOccupiedCells.includes(cellFired)) {
        cell.style.backgroundColor = "#bcd4e6";
        if ((cellOwner === "user") && shipToSink.withinAreaFired) {
            if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "r")) {
                if (!checkCellCoordinate(shipToSink.refCell).includes("A")) {
                    if (!userCellsShot.includes(shipToSink.refCell - 1)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell - 1;
                        shipToSink.shootDirection = "l";
                    } else if (userCellsShot.includes(shipToSink.refCell - 1) && !userCellsShot.includes(shipToSink.refCell - 10)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell - 10;
                        shipToSink.shootDirection = "u";
                    } else if (userCellsShot.includes(shipToSink.refCell - 1) && !userCellsShot.includes(shipToSink.refCell - 10)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell + 10;
                        shipToSink.shootDirection = "d";
                    }
                } else if (checkCellCoordinate(shipToSink.refCell).includes("A")) {
                    if (!userCellsShot.includes(shipToSink.refCell - 10) && ((shipToSink.refCell - 10) >= 0)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell - 10;
                        shipToSink.shootDirection = "u";
                    } else if (!userCellsShot.includes(shipToSink.refCell + 10) && ((shipToSink.refCell + 10) <= 99)) {
                        shipToSink.nextCellToShoot = shipToSink.refCell + 10;
                        shipToSink.shootDirection = "d";
                    }
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "l")) {
                if (((shipToSink.refCell - 10) >= 0) && (!userCellsShot.includes(shipToSink.refCell - 10))) {
                    shipToSink.nextCellToShoot = shipToSink.refCell - 10;
                    shipToSink.shootDirection = "u";
                } else if (((shipToSink.refCell + 10) <= 99) && (!userCellsShot.includes(shipToSink.refCell + 10))) {
                    shipToSink.nextCellToShoot = shipToSink.refCell + 10;
                    shipToSink.shootDirection = "d";
                }
            } else if ((shipToSink.numOfAttempts >= 2) && (shipToSink.shootDirection === "u")) {
                if (((shipToSink.refCell + 10) <= 99) && (!userCellsShot.includes(shipToSink.refCell + 10))) {
                    shipToSink.nextCellToShoot = shipToSink.refCell + 10;
                    shipToSink.shootDirection = "d";
                }
            }

            shipToSink.numOfAttempts += 1;
        }
    }
}

export default addHitOrMissMark;