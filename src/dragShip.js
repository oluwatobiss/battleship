import interact from 'interactjs';

function dragShip(id, name, shipAxisPosition, shipCurrHeadCell, getOccupiedCellsNums, getOccupiedCellsCoords, occupiedCellsNums, occupiedCellsCoords) {
    let draggedShipCurrHeadCellNum = null;
    let draggedShipCurrOccupiedCellsNums = null;
    let draggedShipCurrAxisPosition = null;
    let allShipsOccupiedCellsNums = null;
    let draggedShipProposedCellsNums = [];
    let somePropCellsNotFree = false;

    function getAllShipsOccupiedCellsNums() {
        allShipsOccupiedCellsNums = [...new Set([
            ...occupiedCellsNums.aircraftCarrier,
            ...occupiedCellsNums.battleship,
            ...occupiedCellsNums.cruiser,
            ...occupiedCellsNums.submarine,
            ...occupiedCellsNums.destroyer
        ])];
    }

    function removeDraggedShipCellsFromAllShipsOccCellsNumsArr() {
        draggedShipCurrOccupiedCellsNums.forEach(i => {
            allShipsOccupiedCellsNums = allShipsOccupiedCellsNums.filter(n => n !== i);
        });
    }

    function checkIfAllProposedShipCellsNumsAreFree() {
        for (let i = 0; i < draggedShipProposedCellsNums.length; i++) {
            if (allShipsOccupiedCellsNums.includes(draggedShipProposedCellsNums[i])) {
                somePropCellsNotFree = true;
                return;
            }
        }
    }
    
    interact(id).draggable({      
        modifiers: [
            interact.modifiers.snap({ 
                targets: [interact.snappers.grid({ x: 40, y: 40 })],
                relativePoints: [{ x: 0, y: 0 }],
                offset: 'self',
            }),
            interact.modifiers.restrictRect({
                restriction: '.users-water',
            })
        ]
    })
    .on("dragstart", function () {
        draggedShipCurrHeadCellNum = shipCurrHeadCell.num;
        draggedShipCurrOccupiedCellsNums = occupiedCellsNums[name];
        draggedShipCurrAxisPosition = { x: shipAxisPosition.x, y: shipAxisPosition.y };
        getAllShipsOccupiedCellsNums();
        removeDraggedShipCellsFromAllShipsOccCellsNumsArr();
    })
    .on("dragmove", function (e) {
        const orientation = e.target.dataset.orientation;
    
        shipAxisPosition.x += e.dx;
        shipAxisPosition.y += e.dy;
        
        e.target.style.transform =
        `translate(${shipAxisPosition.x}px, ${shipAxisPosition.y}px)`;

        shipCurrHeadCell.num = Math.round(shipCurrHeadCell.num + ((e.dx/40) + (e.dy/4)));
        occupiedCellsNums[name] = getOccupiedCellsNums(shipCurrHeadCell.num, name, orientation);
        occupiedCellsCoords[name] = getOccupiedCellsCoords(shipCurrHeadCell.num, name, orientation);
    })
    .on("dragend", function (e) {
        const orientation = e.target.dataset.orientation;
        draggedShipProposedCellsNums = getOccupiedCellsNums(shipCurrHeadCell.num, name, orientation);
        checkIfAllProposedShipCellsNumsAreFree();

        if (somePropCellsNotFree) {
            console.error("Cell Occupied = " + somePropCellsNotFree);
            somePropCellsNotFree = false;

            shipAxisPosition.x = draggedShipCurrAxisPosition.x;
            shipAxisPosition.y = draggedShipCurrAxisPosition.y;

            e.target.style.transform =
            `translate(${draggedShipCurrAxisPosition.x}px, ${draggedShipCurrAxisPosition.y}px)`;

            shipCurrHeadCell.num = draggedShipCurrHeadCellNum;
            occupiedCellsNums[name] = getOccupiedCellsNums(draggedShipCurrHeadCellNum, name, orientation);
            occupiedCellsCoords[name] = getOccupiedCellsCoords(draggedShipCurrHeadCellNum, name, orientation);
        } else {
            console.log("Cell Occupied = " + somePropCellsNotFree);
        }

        console.log(occupiedCellsNums[name]);
        console.log(occupiedCellsCoords[name]);
    })
}

export default dragShip;