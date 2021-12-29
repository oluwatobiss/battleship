import {useEffect} from "react";
import interact from 'interactjs';
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";
import checkCellCoordinate from "../checkCellCoordinate";
import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";

const position = { x: 0, y: 0 };
let shipCurrentCellNumber = null;

interact('#battleship').draggable({
    listeners: {
        move (e) {
            position.x += e.dx;
            position.y += e.dy;
            
            e.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`;

            shipCurrentCellNumber += ((e.dx/40) + (e.dy/4));

            console.log(checkShipsOccupiedCellNumbers(shipCurrentCellNumber));
            console.log(checkShipsOccupiedCellCoordinates(shipCurrentCellNumber));
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
}

function placeBattleshipInUsersWater() {
    const ship = document.createElement('div');
    const getRandomNum = () => Math.floor(Math.random() * 100);
    const battleshipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
    const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;

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

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "h"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "h"));
    } else {
        ship.style.width = cellSize + "px";
        ship.style.height = cellSize * 4 + "px";

        while (shipInitialCellNumber >= 70) {
            console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
            shipInitialCellNumber = getRandomNum();
        }

        console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, "v"));
        console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, "v"));
    }

    shipCurrentCellNumber = shipInitialCellNumber;
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

function changeOrientation(e) {
    if (e.target.dataset.orientation === "h") {
        if (shipCurrentCellNumber < 70) {
            e.target.dataset.orientation = "v";
            e.target.style.width = "40px";
            e.target.style.height = "160px";
        }
    } else {
        e.target.dataset.orientation = "h";
        e.target.style.width = "160px";
        e.target.style.height = "40px";
    }
}

function Body() {
    useEffect(() => {
        createGameBoardCoordinate();
        createWaterCells();
        placeBattleshipInUsersWater();
        placeShipsInDockArea();

        document.getElementById("battleship").addEventListener("dblclick", changeOrientation);
        return () => document.getElementById("battleship").removeEventListener("dblclick", changeOrientation);
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