import interact from 'interactjs';

function dragShip(id, name, shipPosition, shipCurrCellNum, occupiedCellNums, occupiedCellCoords) {
    interact(id).draggable({
        listeners: {
            move (e) {
                const orientation = e.target.dataset.orientation;
    
                shipPosition.x += e.dx;
                shipPosition.y += e.dy;
                
                e.target.style.transform =
                `translate(${shipPosition.x}px, ${shipPosition.y}px)`;
    
                shipCurrCellNum.num += ((e.dx/40) + (e.dy/4));
    
                console.log(orientation);
                console.log(e.target);
                console.log(occupiedCellNums(shipCurrCellNum.num, name, orientation));
                console.log(occupiedCellCoords(shipCurrCellNum.num, name, orientation));
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