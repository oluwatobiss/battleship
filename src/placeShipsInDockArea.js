function placeShipsInDockArea() {
    const battleshipDock = document.getElementsByClassName("ship-dock");
    [...battleshipDock].forEach(dock => {
        for(let i = 0; i < 5; i++) {
            const ship = document.createElement('div');
            ship.classList.add("ship-in-docking-area");
            dock.appendChild(ship);
        }
    });
}

export default placeShipsInDockArea;