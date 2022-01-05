import {useEffect} from "react";
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import createGameBoardCoordinate from "../createGameBoardCoordinate";
import checkCellCoordinate from "../checkCellCoordinate";
import createWaterCells from "../createWaterCells";
import placeShipsInUsersWater from "../placeShipsInUsersWater";
import shipFactory from "../shipFactory";
import { getShipOccupiedCellsNumbers, getShipOccupiedCellsCoordinates } from "../getShipOccupiedCells";
import changeShipOrientation from "../changeShipOrientation";
import dragShip from "../dragShip";
import placeShipsInDockArea from "../placeShipsInDockArea";
import GameButton from "./GameButton";

let aircraftCarrierCurrCellNum = { num: null };
let battleshipCurrCellNum = { num: null };
let cruiserCurrCellNum = { num: null };
let submarineCurrCellNum = { num: null };
let destroyerCurrCellNum = { num: null };

const ships = shipFactory();
const aircraftCarrierAxisPosition = { x: 0, y: 0 };
const battleShipAxisPosition = { x: 0, y: 0 };
const cruiserAxisPosition = { x: 0, y: 0 };
const submarineAxisPosition = { x: 0, y: 0 };
const destroyerAxisPosition = { x: 0, y: 0 };
const occupiedCellsNums = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};
const occupiedCellsCoords = {
    aircraftCarrier: [],
    battleship: [],
    cruiser: [],
    submarine: [],
    destroyer: []
};

const changeAircraftCarrierOrientation = e => changeShipOrientation(e, ships, "aircraftCarrier", aircraftCarrierCurrCellNum.num, checkCellCoordinate);
const changeBattleshipOrientation = e => changeShipOrientation(e, ships, "battleship", battleshipCurrCellNum.num, checkCellCoordinate);
const changeCruiserOrientation = e => changeShipOrientation(e, ships, "cruiser", cruiserCurrCellNum.num, checkCellCoordinate);
const changeSubmarineOrientation = e => changeShipOrientation(e, ships, "submarine", submarineCurrCellNum.num, checkCellCoordinate);
const changeDestroyerOrientation = e => changeShipOrientation(e, ships, "destroyer", destroyerCurrCellNum.num, checkCellCoordinate);

function Body() {
    useEffect(() => {
        createGameBoardCoordinate();
        createWaterCells();
        placeShipsInUsersWater(
            ships,
            checkCellCoordinate,
            getShipOccupiedCellsNumbers,
            getShipOccupiedCellsCoordinates,
            aircraftCarrierCurrCellNum, 
            battleshipCurrCellNum, 
            cruiserCurrCellNum,
            submarineCurrCellNum,
            destroyerCurrCellNum,
            occupiedCellsNums,
            occupiedCellsCoords
        );
        placeShipsInDockArea();

        dragShip(
            "#aircraft-carrier", 
            "aircraftCarrier",
            aircraftCarrierAxisPosition, 
            aircraftCarrierCurrCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            occupiedCellsNums,
            occupiedCellsCoords
        );
        dragShip(
            "#battleship", 
            "battleship",
            battleShipAxisPosition, 
            battleshipCurrCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            occupiedCellsNums,
            occupiedCellsCoords
        );
        dragShip(
            "#cruiser", 
            "cruiser",
            cruiserAxisPosition, 
            cruiserCurrCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            occupiedCellsNums,
            occupiedCellsCoords
        );
        dragShip(
            "#submarine", 
            "submarine",
            submarineAxisPosition, 
            submarineCurrCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            occupiedCellsNums,
            occupiedCellsCoords
        );
        dragShip(
            "#destroyer", 
            "destroyer",
            destroyerAxisPosition, 
            destroyerCurrCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            occupiedCellsNums,
            occupiedCellsCoords
        );

        document.getElementById("aircraft-carrier").addEventListener("dblclick", changeAircraftCarrierOrientation);
        document.getElementById("battleship").addEventListener("dblclick", changeBattleshipOrientation);
        document.getElementById("cruiser").addEventListener("dblclick", changeCruiserOrientation);
        document.getElementById("submarine").addEventListener("dblclick", changeSubmarineOrientation);
        document.getElementById("destroyer").addEventListener("dblclick", changeDestroyerOrientation);
        
        return () => {
            document.getElementById("aircraft-carrier").removeEventListener("dblclick", changeAircraftCarrierOrientation);
            document.getElementById("battleship").removeEventListener("dblclick", changeBattleshipOrientation);
            document.getElementById("cruiser").removeEventListener("dblclick", changeCruiserOrientation);
            document.getElementById("submarine").removeEventListener("dblclick", changeSubmarineOrientation);
            document.getElementById("destroyer").removeEventListener("dblclick", changeDestroyerOrientation);
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