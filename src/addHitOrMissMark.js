function addHitOrMissMark(cellOwner, cell, occupiedCellsNums, shipsInDockingArea, ships) {
    const cellFired = cellOwner === "pc" ? Number(cell.id.slice(8)) : Number(cell.id.slice(10));
    const shipsOccupiedCells = [...new Set([
        ...occupiedCellsNums.aircraftCarrier,
        ...occupiedCellsNums.battleship,
        ...occupiedCellsNums.cruiser,
        ...occupiedCellsNums.submarine,
        ...occupiedCellsNums.destroyer
    ])];

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
                        console.log("Life Remaining: " + ships[i].life);
                    }
                    // Notify if the fired ship has been sunk:
                    if (ships[i].life === 0) {
                        shipsInDockingArea[i].style.backgroundColor = "#fd5e53";
                    }
                }
            }
        }
    } else {
        cell.style.backgroundColor = "#bcd4e6";
    }
}

export default addHitOrMissMark;