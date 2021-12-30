import {useEffect} from "react";
import interact from 'interactjs';
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import createGameBoardCoordinate from "../createGameBoardCoordinate";
import checkCellCoordinate from "../checkCellCoordinate";
import createWaterCells from "../createWaterCells";
import shipFactory from "../shipFactory";
import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";
import placeShipsInDockArea from "../placeShipsInDockArea";
import GameButton from "./GameButton";

const ships = shipFactory();
const battleShipPosition = { x: 0, y: 0 };
const aircraftCarrierPosition = { x: 0, y: 0 };

let battleshipCurrentCellNumber = null;
let aircraftCarrierCurrentCellNumber = null;

interact('#aircraft-carrier').draggable({
    listeners: {
        move (e) {
            const orientation = e.target.dataset.orientation;

            aircraftCarrierPosition.x += e.dx;
            aircraftCarrierPosition.y += e.dy;
            
            e.target.style.transform =
            `translate(${aircraftCarrierPosition.x}px, ${aircraftCarrierPosition.y}px)`;

            aircraftCarrierCurrentCellNumber += ((e.dx/40) + (e.dy/4));

            console.log(orientation);
            console.log(e.target);
            console.log(checkShipsOccupiedCellNumbers(aircraftCarrierCurrentCellNumber, "Aircraft Carrier", orientation));
            console.log(checkShipsOccupiedCellCoordinates(aircraftCarrierCurrentCellNumber, "Aircraft Carrier", orientation));
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

interact('#battleship').draggable({
    listeners: {
        move (e) {
            const orientation = e.target.dataset.orientation;

            battleShipPosition.x += e.dx;
            battleShipPosition.y += e.dy;
            
            e.target.style.transform =
            `translate(${battleShipPosition.x}px, ${battleShipPosition.y}px)`;

            battleshipCurrentCellNumber += ((e.dx/40) + (e.dy/4));

            console.log(orientation);
            console.log(e.target);
            console.log(checkShipsOccupiedCellNumbers(battleshipCurrentCellNumber, "Battleship", orientation));
            console.log(checkShipsOccupiedCellCoordinates(battleshipCurrentCellNumber, "Battleship", orientation));
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

function placeShipsInUsersWater(ships) {
    ships.forEach(obj => {        
        const ship = document.createElement('div');
        const getRandomNum = () => Math.floor(Math.random() * 100);
        const shipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
        const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
    
        let shipInitialCellNumber = getRandomNum();
        let usersWaterCell = null;
    
        ship.setAttribute("id", obj.id);
        ship.setAttribute("data-orientation", shipOrientation);
        
        if (shipOrientation === "h") {
            ship.style.width = cellSize * obj.length + "px";
            ship.style.height = cellSize + "px";
    
            while (obj.notHeadColumns.test(checkCellCoordinate(shipInitialCellNumber))) {
                console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, obj.name, "h"));
            console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, obj.name, "h"));
        } else {
            ship.style.width = cellSize + "px";
            ship.style.height = cellSize * obj.length + "px";
    
            while (shipInitialCellNumber >= obj.notHeadRows) {
                console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, obj.name, "v"));
            console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, obj.name, "v"));
        }
    
        aircraftCarrierCurrentCellNumber = shipInitialCellNumber;
        usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
        
        usersWaterCell.appendChild(ship);
    });
}

// function placeAircraftCarrierInUsersWater() {
//     const ship = document.createElement('div');
//     const getRandomNum = () => Math.floor(Math.random() * 100);
//     const aircraftCarrierOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
//     const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;

//     let shipInitialCellNumber = getRandomNum();
//     let usersWaterCell = null;

//     ship.setAttribute("id", "aircraft-carrier");
//     ship.setAttribute("data-orientation", aircraftCarrierOrientation);
    
//     if (aircraftCarrierOrientation === "h") {
//         ship.style.width = cellSize * 5 + "px";
//         ship.style.height = cellSize + "px";

//         while (/G|H|I|J/.test(checkCellCoordinate(shipInitialCellNumber))) {
//             console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
//             shipInitialCellNumber = getRandomNum();
//         }

//         console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Aircraft Carrier", "h"));
//         console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Aircraft Carrier", "h"));
//     } else {
//         ship.style.width = cellSize + "px";
//         ship.style.height = cellSize * 5 + "px";

//         while (shipInitialCellNumber >= 60) {
//             console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
//             shipInitialCellNumber = getRandomNum();
//         }

//         console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Aircraft Carrier", "v"));
//         console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Aircraft Carrier", "v"));
//     }

//     aircraftCarrierCurrentCellNumber = shipInitialCellNumber;
//     usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
    
//     usersWaterCell.appendChild(ship);
// }

// function placeBattleshipInUsersWater() {
//     const ship = document.createElement('div');
//     const getRandomNum = () => Math.floor(Math.random() * 100);
//     const battleshipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
//     const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;

//     let shipInitialCellNumber = getRandomNum();
//     let usersWaterCell = null;

//     ship.setAttribute("id", "battleship");
//     ship.setAttribute("data-orientation", battleshipOrientation);
    
//     if (battleshipOrientation === "h") {
//         ship.style.width = cellSize * 4 + "px";
//         ship.style.height = cellSize + "px";

//         while (/H|I|J/.test(checkCellCoordinate(shipInitialCellNumber))) {
//             console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
//             shipInitialCellNumber = getRandomNum();
//         }

//         console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Battleship", "h"));
//         console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Battleship", "h"));
//     } else {
//         ship.style.width = cellSize + "px";
//         ship.style.height = cellSize * 4 + "px";

//         while (shipInitialCellNumber >= 70) {
//             console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
//             shipInitialCellNumber = getRandomNum();
//         }

//         console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Battleship", "v"));
//         console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Battleship", "v"));
//     }

//     battleshipCurrentCellNumber = shipInitialCellNumber;
//     usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
    
//     usersWaterCell.appendChild(ship);
// }

function changeAircraftCarrierOrientation(e) {
    const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;

    if (e.target.dataset.orientation === "h") {
        if (aircraftCarrierCurrentCellNumber < 60) {
            e.target.dataset.orientation = "v";
            e.target.style.width = cellSize + "px";
            e.target.style.height = cellSize * 5 + "px";
        }
    } else {
        if (!/G|H|I|J/.test(checkCellCoordinate(aircraftCarrierCurrentCellNumber))) {
            e.target.dataset.orientation = "h";
            e.target.style.width = cellSize * 5 + "px";
            e.target.style.height = cellSize + "px";
        }
    }
}

function changeBattleshipOrientation(e) {
    const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;

    if (e.target.dataset.orientation === "h") {
        if (battleshipCurrentCellNumber < 70) {
            e.target.dataset.orientation = "v";
            e.target.style.width = cellSize + "px";
            e.target.style.height = cellSize * 4 + "px";
        }
    } else {
        if (!/H|I|J/.test(checkCellCoordinate(battleshipCurrentCellNumber))) {
            e.target.dataset.orientation = "h";
            e.target.style.width = cellSize * 4 + "px";
            e.target.style.height = cellSize + "px";
        }
    }
}

function Body() {
    useEffect(() => {
        createGameBoardCoordinate();
        createWaterCells();
        placeShipsInUsersWater(ships)
        // placeAircraftCarrierInUsersWater();
        // placeBattleshipInUsersWater();
        placeShipsInDockArea();

        document.getElementById("aircraft-carrier").addEventListener("dblclick", changeAircraftCarrierOrientation);
        document.getElementById("battleship").addEventListener("dblclick", changeBattleshipOrientation);
        return () => {
            document.getElementById("aircraft-carrier").removeEventListener("dblclick", changeAircraftCarrierOrientation);
            document.getElementById("battleship").removeEventListener("dblclick", changeBattleshipOrientation);
        }
    }, []);

    return (
        <div>
            <section id="info-area">
                <p>This is the message board</p>
            </section>
            <section id="grid-area">
                <UsersGridArea />
                <ComputersGridArea />
            </section>
            <section id="button-area">
                <GameButton />
            </section>
        </div>
    );
}

export default Body;