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