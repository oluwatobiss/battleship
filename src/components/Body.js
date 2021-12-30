import {useEffect} from "react";
import interact from 'interactjs';
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";
import checkCellCoordinate from "../checkCellCoordinate";
import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";

const battleShipPosition = { x: 0, y: 0 };
const aircraftCarrierPosition = { x: 0, y: 0 };
let battleshipCurrentCellNumber = null;
let aircraftCarrierCurrentCellNumber = null;
let cellSize = null;

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

function createGameBoardCoordinate() {
    const gameBoard = document.getElementsByClassName("game-board");
    [...gameBoard].forEach(board => {
        for (let i = 0; i < 121; i++) {
            const cell = document.createElement('div');
            cell.classList.add("coordinate");

            if (i > 0 && i < 11) {
                const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                cell.append(letters[i]);
            }

            if (/^11$|22|33|44|55|66|77|88|99|110/.test(i.toString())) {
                cell.append(i.toString().slice(1));
            }

            board.appendChild(cell);
        }
    });
}

function createWaterCells() {
    const gameWater = document.getElementsByClassName("game-water");

    [...gameWater].forEach(board => {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");

            board.classList.contains("pc-water")
            ? cell.setAttribute("id", `pc-cell-${i}`)
            : cell.setAttribute("id", `user-cell-${i}`);

            board.appendChild(cell);
        }
    });

    cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
}

function placeAircraftCarrierInUsersWater() {
    const ship = document.createElement('div');
    const getRandomNum = () => Math.floor(Math.random() * 100);
    const battleshipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";

    let shipInitialCellNumber = getRandomNum();
    let usersWaterCell = null;

    ship.setAttribute("id", "aircraft-carrier");
    ship.setAttribute("data-orientation", battleshipOrientation);
    
    if (battleshipOrientation === "h") {
        ship.style.width = cellSize * 5 + "px";
        ship.style.height = cellSize + "px";

        while (/G|H|I|J/.test(checkCellCoordinate(shipInitialCellNumber))) {
            console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
            shipInitialCellNumber = getRandomNum();
        }

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Aircraft Carrier", "h"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Aircraft Carrier", "h"));
    } else {
        ship.style.width = cellSize + "px";
        ship.style.height = cellSize * 5 + "px";

        while (shipInitialCellNumber >= 60) {
            console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
            shipInitialCellNumber = getRandomNum();
        }

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Aircraft Carrier", "v"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Aircraft Carrier", "v"));
    }

    aircraftCarrierCurrentCellNumber = shipInitialCellNumber;
    usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
    
    usersWaterCell.appendChild(ship);
}

function placeBattleshipInUsersWater() {
    const ship = document.createElement('div');
    const getRandomNum = () => Math.floor(Math.random() * 100);
    const battleshipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";

    let shipInitialCellNumber = getRandomNum();
    let usersWaterCell = null;

    ship.setAttribute("id", "battleship");
    ship.setAttribute("data-orientation", battleshipOrientation);
    
    if (battleshipOrientation === "h") {
        ship.style.width = cellSize * 4 + "px";
        ship.style.height = cellSize + "px";

        while (/H|I|J/.test(checkCellCoordinate(shipInitialCellNumber))) {
            console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
            shipInitialCellNumber = getRandomNum();
        }

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Battleship", "h"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Battleship", "h"));
    } else {
        ship.style.width = cellSize + "px";
        ship.style.height = cellSize * 4 + "px";

        while (shipInitialCellNumber >= 70) {
            console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
            shipInitialCellNumber = getRandomNum();
        }

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "Battleship", "v"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "Battleship", "v"));
    }

    battleshipCurrentCellNumber = shipInitialCellNumber;
    usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
    
    usersWaterCell.appendChild(ship);
}

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

function changeAircraftCarrierOrientation(e) {
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
        placeAircraftCarrierInUsersWater();
        placeBattleshipInUsersWater();
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