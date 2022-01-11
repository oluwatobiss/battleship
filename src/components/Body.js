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
let shipsInDockingArea = null;
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

const ships = shipFactory();
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

const changeAircraftCarrierOrientation = e => changeShipOrientation(e, ships, "aircraftCarrier", userAircraftCarrCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeBattleshipOrientation = e => changeShipOrientation(e, ships, "battleship", userBattleshipCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeCruiserOrientation = e => changeShipOrientation(e, ships, "cruiser", userCruiserCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeSubmarineOrientation = e => changeShipOrientation(e, ships, "submarine", userSubmarineCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
const changeDestroyerOrientation = e => changeShipOrientation(e, ships, "destroyer", userDestroyerCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);

function addHitOrMissMark() {
    if (!this.style.backgroundColor && !gameOver) {
        const clickedCellNum = Number(this.id.slice(8));
        const pcShipsOccupiedCells = [...new Set([
            ...pcOccupiedCellsNums.aircraftCarrier,
            ...pcOccupiedCellsNums.battleship,
            ...pcOccupiedCellsNums.cruiser,
            ...pcOccupiedCellsNums.submarine,
            ...pcOccupiedCellsNums.destroyer
        ])];

        console.log(pcShipsOccupiedCells);

        if (pcShipsOccupiedCells.includes(clickedCellNum)) {
            this.style.backgroundColor = "#fd5e53";
            // Track ships' life:
            for (const shipName in pcOccupiedCellsNums) {
                if (pcOccupiedCellsNums[shipName].includes(clickedCellNum)) {
                    for (let i = 0; i < ships.length; i++) {
                        if (ships[i].name === shipName) {
                            ships[i].life -= 1;
                        }
                    }
                }
            }
        } else {
            this.innerText = "•";
            this.style.backgroundColor = "#e5e4e2"; 
        }

        console.log(clickedCellNum);
    }
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
            ships,
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
            ships,
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
        shipsInDockingArea = document.querySelectorAll(".pc-ships .ship-in-docking-area");

        console.log(shipsInDockingArea);

        document.getElementById("aircraft-carrier").addEventListener("dblclick", changeAircraftCarrierOrientation);
        document.getElementById("battleship").addEventListener("dblclick", changeBattleshipOrientation);
        document.getElementById("cruiser").addEventListener("dblclick", changeCruiserOrientation);
        document.getElementById("submarine").addEventListener("dblclick", changeSubmarineOrientation);
        document.getElementById("destroyer").addEventListener("dblclick", changeDestroyerOrientation);
        pcCells.forEach(c => c.addEventListener("click", addHitOrMissMark));
        pcCells.forEach(c => c.addEventListener("mouseenter", addBorder));
        pcCells.forEach(c => c.addEventListener("mouseleave", removeBorder));
        
        return () => {
            document.getElementById("aircraft-carrier").removeEventListener("dblclick", changeAircraftCarrierOrientation);
            document.getElementById("battleship").removeEventListener("dblclick", changeBattleshipOrientation);
            document.getElementById("cruiser").removeEventListener("dblclick", changeCruiserOrientation);
            document.getElementById("submarine").removeEventListener("dblclick", changeSubmarineOrientation);
            document.getElementById("destroyer").removeEventListener("dblclick", changeDestroyerOrientation);
            pcCells.forEach(c => c.removeEventListener("click", addHitOrMissMark));
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