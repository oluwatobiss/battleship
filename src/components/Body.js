import {useEffect} from "react";
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import createGameBoardCoordinate from "../createGameBoardCoordinate";
import checkCellCoordinate from "../checkCellCoordinate";
import createWaterCells from "../createWaterCells";
import placeShipsInWater from "../placeShipsInWater";
import shipFactory from "../shipFactory";
import { getShipOccupiedCellsNumbers, getShipOccupiedCellsCoordinates } from "../getShipOccupiedCells";
import changeShipOrientation from "../changeShipOrientation";
import dragShip from "../dragShip";
import placeShipsInDockArea from "../placeShipsInDockArea";
import GameButton from "./GameButton";

let gameOver = false;
let pcCells = null;
let userCells = null;
let userCellsShot = [];
let pcShipsInDockingArea = null;
let userShipsInDockingArea = null;
let userAircraftCarrCurrHeadCellNum = { num: null };
let userBattleshipCurrHeadCellNum = { num: null };
let userCruiserCurrHeadCellNum = { num: null };
let userSubmarineCurrHeadCellNum = { num: null };
let userDestroyerCurrHeadCellNum = { num: null };
let pcAircraftCarrCurrHeadCellNum = { num: null };
let pcBattleshipCurrHeadCellNum = { num: null };
let pcCruiserCurrHeadCellNum = { num: null };
let pcSubmarineCurrHeadCellNum = { num: null };
let pcDestroyerCurrHeadCellNum = { num: null };

const pcShips = shipFactory();
const userShips = shipFactory();
const aircraftCarrierAxisPosition = { x: 0, y: 0 };
const battleShipAxisPosition = { x: 0, y: 0 };
const cruiserAxisPosition = { x: 0, y: 0 };
const submarineAxisPosition = { x: 0, y: 0 };
const destroyerAxisPosition = { x: 0, y: 0 };
const userOccupiedCellsNums = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};
const userOccupiedCellsCoords = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};
const pcOccupiedCellsNums = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};
const pcOccupiedCellsCoords = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};

const changeAircraftCarrierOrientation = e => changeShipOrientation(e, userShips, "aircraftCarrier", userAircraftCarrCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeBattleshipOrientation = e => changeShipOrientation(e, userShips, "battleship", userBattleshipCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeCruiserOrientation = e => changeShipOrientation(e, userShips, "cruiser", userCruiserCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeSubmarineOrientation = e => changeShipOrientation(e, userShips, "submarine", userSubmarineCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeDestroyerOrientation = e => changeShipOrientation(e, userShips, "destroyer", userDestroyerCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);

function shootShip() {
    if (!this.style.backgroundColor && !gameOver) {
        addHitOrMissMark("pc", this, pcOccupiedCellsNums, pcShipsInDockingArea, pcShips);
        checkIfGameIsOver(pcShipsInDockingArea);
        if (!gameOver) {
            const getRandomNum = () => Math.floor(Math.random() * 100);
            let cellNum = getRandomNum();
    
            while (userCellsShot.includes(cellNum)) {
                cellNum = getRandomNum();
            }
    
            userCellsShot.push(cellNum);
            addHitOrMissMark("user", userCells[cellNum], userOccupiedCellsNums, userShipsInDockingArea, userShips);
            checkIfGameIsOver(userShipsInDockingArea);
        }
    }
}

function checkIfGameIsOver(dockingAreaShips) {
    if (Array.from(dockingAreaShips).every(i => i.style.backgroundColor)) {
        console.log(dockingAreaShips);
        gameOver = true;
        console.log("GAMEOVER!!!!");
    }
}

function addHitOrMissMark(cellOwner, cell, occupiedCellsNums, shipsInDockingArea, ships) {
    const cellFired = cellOwner === "pc" ? Number(cell.id.slice(8)) : Number(cell.id.slice(10));
    const pcShipsOccupiedCells = [...new Set([
        ...occupiedCellsNums.aircraftCarrier,
        ...occupiedCellsNums.battleship,
        ...occupiedCellsNums.cruiser,
        ...occupiedCellsNums.submarine,
        ...occupiedCellsNums.destroyer
    ])];

    console.log(pcShipsOccupiedCells);

    if (pcShipsOccupiedCells.includes(cellFired)) {
        cell.style.backgroundColor = "#fd5e53";
        // Track userShips' life and show when userShips get sunk:
        for (const shipName in occupiedCellsNums) {
            if (occupiedCellsNums[shipName].includes(cellFired)) {
                for (let i = 0; i < ships.length; i++) {
                    (ships[i].name === shipName) && (ships[i].life -= 1);
                    (ships[i].life === 0) && (shipsInDockingArea[i].style.backgroundColor = "#fd5e53");
                }
            }
        }
    } else {
        cell.innerText = "•";
        cell.style.backgroundColor = "#e5e4e2"; 
    }

    console.log(cellFired);
}

function addBorder() {
    if (!this.style.backgroundColor && !gameOver) {
        this.style.border = "1px solid brown";
        this.style.cursor = "pointer";
    }
}

function removeBorder() {
    this.style.border = "";
    this.style.cursor = "";
}

function Body() {
    useEffect(() => {
        createGameBoardCoordinate();
        createWaterCells();
        placeShipsInWater(
            "user",
            userShips,
            checkCellCoordinate,
            getShipOccupiedCellsNumbers,
            getShipOccupiedCellsCoordinates,
            userAircraftCarrCurrHeadCellNum, 
            userBattleshipCurrHeadCellNum, 
            userCruiserCurrHeadCellNum,
            userSubmarineCurrHeadCellNum,
            userDestroyerCurrHeadCellNum,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );
        placeShipsInWater(
            "pc",
            pcShips,
            checkCellCoordinate,
            getShipOccupiedCellsNumbers,
            getShipOccupiedCellsCoordinates,
            pcAircraftCarrCurrHeadCellNum, 
            pcBattleshipCurrHeadCellNum, 
            pcCruiserCurrHeadCellNum,
            pcSubmarineCurrHeadCellNum,
            pcDestroyerCurrHeadCellNum,
            pcOccupiedCellsNums,
            pcOccupiedCellsCoords
        );
        placeShipsInDockArea();

        dragShip(
            "#aircraft-carrier", 
            "aircraftCarrier",
            aircraftCarrierAxisPosition, 
            userAircraftCarrCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );
        dragShip(
            "#battleship", 
            "battleship",
            battleShipAxisPosition, 
            userBattleshipCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );
        dragShip(
            "#cruiser", 
            "cruiser",
            cruiserAxisPosition, 
            userCruiserCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );
        dragShip(
            "#submarine", 
            "submarine",
            submarineAxisPosition, 
            userSubmarineCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );
        dragShip(
            "#destroyer", 
            "destroyer",
            destroyerAxisPosition, 
            userDestroyerCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );

        pcCells = document.querySelectorAll("div[id^='pc-cell-']");
        userCells = document.querySelectorAll("div[id^='user-cell-']");
        pcShipsInDockingArea = document.querySelectorAll(".pc-ships .ship-in-docking-area");
        userShipsInDockingArea = document.querySelectorAll(".user-ships .ship-in-docking-area");

        document.getElementById("aircraft-carrier").addEventListener("dblclick", changeAircraftCarrierOrientation);
        document.getElementById("battleship").addEventListener("dblclick", changeBattleshipOrientation);
        document.getElementById("cruiser").addEventListener("dblclick", changeCruiserOrientation);
        document.getElementById("submarine").addEventListener("dblclick", changeSubmarineOrientation);
        document.getElementById("destroyer").addEventListener("dblclick", changeDestroyerOrientation);
        pcCells.forEach(c => c.addEventListener("click", shootShip));
        pcCells.forEach(c => c.addEventListener("mouseenter", addBorder));
        pcCells.forEach(c => c.addEventListener("mouseleave", removeBorder));
        
        return () => {
            document.getElementById("aircraft-carrier").removeEventListener("dblclick", changeAircraftCarrierOrientation);
            document.getElementById("battleship").removeEventListener("dblclick", changeBattleshipOrientation);
            document.getElementById("cruiser").removeEventListener("dblclick", changeCruiserOrientation);
            document.getElementById("submarine").removeEventListener("dblclick", changeSubmarineOrientation);
            document.getElementById("destroyer").removeEventListener("dblclick", changeDestroyerOrientation);
            pcCells.forEach(c => c.removeEventListener("click", shootShip));
            pcCells.forEach(c => c.removeEventListener("mouseenter", addBorder));
            pcCells.forEach(c => c.removeEventListener("mouseleave", removeBorder));
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