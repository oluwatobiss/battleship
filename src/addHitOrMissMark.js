function addHitOrMissMark(cellOwner, cell, occupiedCellsNums, shipsInDockingArea, ships) {
    const cellFired = cellOwner === "pc" ? Number(cell.id.slice(8)) : Number(cell.id.slice(10));
    const pcShipsOccupiedCells = [...new Set([
        ...occupiedCellsNums.aircraftCarrier,
        ...occupiedCellsNums.battleship,
        ...occupiedCellsNums.cruiser,
        ...occupiedCellsNums.submarine,
        ...occupiedCellsNums.destroyer
    ])];

    if (pcShipsOccupiedCells.includes(cellFired)) {
        cell.style.backgroundColor = "#fd5e53";
        // Track userShips' life and show when userShips get sunk:
        for (const shipName in occupiedCellsNums) {
            if (occupiedCellsNums[shipName].includes(cellFired)) {
                for (let i = 0; i < ships.length; i++) {
                    (ships[i].name === shipName) && (ships[i].life -= 1);
                    (ships[i].life === 0) && (shipsInDockingArea[i].style.backgroundColor = "#fd5e53");
                }
            }
        }
    } else {
        cell.innerText = "•";
        cell.style.color = "dimgrey"; 
        cell.style.backgroundColor = "#e5e4e2"; 
    }
}

export default addHitOrMissMark;