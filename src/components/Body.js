import {useEffect} from "react";
import interact from 'interactjs';
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";

const position = { x: 0, y: 0 };
let shipInitialCellNumber = null;
let shipCurrentCellNumber = null;

interact('#test-ship').draggable({
    listeners: {
        move (e) {
            console.log(e.dx, e.dy);
            
            position.x += e.dx;
            position.y += e.dy;
            
            e.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`;

            shipCurrentCellNumber += ((e.dx/40) + (e.dy/4));

            console.log(shipInitialCellNumber);
            console.log(shipCurrentCellNumber);
            console.log(checkCellCoordinate(shipCurrentCellNumber));
            // console.log(e.target);
            // console.log(position);
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

function checkCellCoordinate(num) {
    const lastIndexNum = num.toString().slice(-1);
    let horizontalCoordinate = null;
    let verticalCoordinate = null;

    switch (lastIndexNum) {
        case "0": verticalCoordinate = "A"; break;
        case "1": verticalCoordinate = "B"; break;
        case "2": verticalCoordinate = "C"; break;
        case "3": verticalCoordinate = "D"; break;
        case "4": verticalCoordinate = "E"; break;
        case "5": verticalCoordinate = "F"; break;
        case "6": verticalCoordinate = "G"; break;
        case "7": verticalCoordinate = "H"; break;
        case "8": verticalCoordinate = "I"; break;
        case "9": verticalCoordinate = "J"; break;
        default: console.error("Vertical: Invalid cell input");
    }
    
    num >= 0 && num < 10 ? horizontalCoordinate = 1 
    : num >= 10 && num < 20 ? horizontalCoordinate = 2
    : num >= 20 && num < 30 ? horizontalCoordinate = 3
    : num >= 30 && num < 40 ? horizontalCoordinate = 4
    : num >= 40 && num < 50 ? horizontalCoordinate = 5
    : num >= 50 && num < 60 ? horizontalCoordinate = 6
    : num >= 60 && num < 70 ? horizontalCoordinate = 7
    : num >= 70 && num < 80 ? horizontalCoordinate = 8
    : num >= 80 && num < 90 ? horizontalCoordinate = 9
    : num >= 90 && num < 100 ? horizontalCoordinate = 10
    : console.log("Horizontal: Invalid cell input!");

    return verticalCoordinate + horizontalCoordinate;
}

function placeShipInUsersWater() {
    const ship = document.createElement('div');
    const getRandomNum = () => Math.floor(Math.random() * 100);

    let cellToPlaceShip = getRandomNum();
    let shipInitialCellCoordinate = null;
    let usersWaterCell = null;

    while (/H|I|J/.test(checkCellCoordinate(cellToPlaceShip))) {
        console.error(checkCellCoordinate(cellToPlaceShip));
        cellToPlaceShip = getRandomNum();
    }

    shipInitialCellNumber = cellToPlaceShip;
    shipCurrentCellNumber = cellToPlaceShip;
    shipInitialCellCoordinate = checkCellCoordinate(cellToPlaceShip);
    usersWaterCell = document.getElementsByClassName("users-water")[0].children[cellToPlaceShip];

    console.log(cellToPlaceShip);
    // console.log(usersWaterCell);
    console.log(shipInitialCellCoordinate);
    
    ship.setAttribute("id", "test-ship");
    ship.setAttribute("data-orientation", "h");
    ship.style.width = "160px";
    ship.style.height = "40px";
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
        if (shipInitialCellNumber < 70) {
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
        placeShipInUsersWater();
        placeShipsInDockArea();

        document.getElementById("test-ship").addEventListener("dblclick", changeOrientation);
        return () => document.getElementById("test-ship").removeEventListener("dblclick", changeOrientation);
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