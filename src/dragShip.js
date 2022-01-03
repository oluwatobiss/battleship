import interact from 'interactjs';

function dragShip(id, name, shipPosition, shipCurrCellNum, getOccupiedCellsNums, getOccupiedCellsCoords, occupiedCellsNums, occupiedCellsCoords) {
    interact(id).draggable({
        listeners: {
            move (e) {
                const orientation = e.target.dataset.orientation;
    
                shipPosition.x += e.dx;
                shipPosition.y += e.dy;
                
                e.target.style.transform =
                `translate(${shipPosition.x}px, ${shipPosition.y}px)`;
    
                shipCurrCellNum.num += ((e.dx/40) + (e.dy/4));
                occupiedCellsNums[name] = getOccupiedCellsNums(shipCurrCellNum.num, name, orientation);
                occupiedCellsCoords[name] = getOccupiedCellsCoords(shipCurrCellNum.num, name, orientation);

                console.log(orientation);
                console.log(occupiedCellsNums[name]);
                console.log(occupiedCellsCoords[name]);
            },
        },
      
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '.users-water',
            }),
        
            interact.modifiers.snap({ 
                targets: [interact.snappers.grid({ x: 40, y: 40 })],
                relativePoints: [{ x: 0, y: 0 }],
                offset: 'self',
            })
        ]
    });
}

export default dragShip;