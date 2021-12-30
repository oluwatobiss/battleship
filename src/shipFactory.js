function shipFactory() {
    const ships = [
        {
            name: "Aircraft Carrier",
            id: "aircraft-carrier",
            notHeadColumns: /G|H|I|J/,
            notHeadRows: 60,
            length: 5,
        },
        {
            name: "Battleship",
            id: "battleship",
            notHeadColumns: /H|I|J/,
            notHeadRows: 70,
            length: 4,
        },
        {
            name: "Cruiser",
            id: "cruiser",
            notHeadColumns: /I|J/,
            notHeadRows: 80,
            length: 3,
        },
        {
            name: "Submarine",
            id: "submarine",
            notHeadColumns: /I|J/,
            notHeadRows: 80,
            length: 3,
        },
        {
            name: "Destroyer",
            id: "destroyer",
            notHeadColumns: /J/,
            notHeadRows: 90,
            length: 2,
        }
    ]

    return ships;
}

export default shipFactory;

// function Ship(shipName) {
//     let shipInfo = { 
//         length: null, 
//         hitSpots: [], 
//         sunk: false,
//         hit: function(num) { this.hitSpots.push(num) },
//         isSunk: function() {
//             if (this.length === this.hitSpots.length) {
//                 this.sunk = true;
//             }
//         }
//     };

//     switch (shipName) {
//         case "Aircraft Carrier": shipInfo.length = 5; break;
//         case "Battleship": shipInfo.length = 4; break;
//         case "Cruiser": shipInfo.length = 3; break;
//         case "Submarine": shipInfo.length = 3; break;
//         case "Destroyer": shipInfo.length = 2; break;
//         default: console.error("Not a valid ship name");
//     }

//     return shipInfo;
// }

// export default Ship;