import {useEffect} from "react";
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import createGameBoardCoordinate from "../createGameBoardCoordinate";
import checkCellCoordinate from "../checkCellCoordinate";
import createWaterCells from "../createWaterCells";
import shipFactory from "../shipFactory";
import { checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates } from "../checkShipsOccupiedCells";
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
const aircraftCarrierPosition = { x: 0, y: 0 };
const battleShipPosition = { x: 0, y: 0 };
const cruiserPosition = { x: 0, y: 0 };
const submarinePosition = { x: 0, y: 0 };
const destroyerPosition = { x: 0, y: 0 };

const changeAircraftCarrierOrientation = e => changeShipOrientation(e, ships, "Aircraft Carrier", aircraftCarrierCurrCellNum.num, checkCellCoordinate);
const changeBattleshipOrientation = e => changeShipOrientation(e, ships, "Battleship", battleshipCurrCellNum.num, checkCellCoordinate);
const changeCruiserOrientation = e => changeShipOrientation(e, ships, "Cruiser", cruiserCurrCellNum.num, checkCellCoordinate);
const changeSubmarineOrientation = e => changeShipOrientation(e, ships, "Submarine", submarineCurrCellNum.num, checkCellCoordinate);
const changeDestroyerOrientation = e => changeShipOrientation(e, ships, "Destroyer", destroyerCurrCellNum.num, checkCellCoordinate);

function placeShipsInUsersWater(ships) {
    ships.forEach(shipData => {        
        const ship = document.createElement('div');
        const getRandomNum = () => Math.floor(Math.random() * 100);
        const shipOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? "h" : "v";
        const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
    
        let shipInitialCellNumber = getRandomNum();
        let usersWaterCell = null;
    
        ship.setAttribute("id", shipData.id);
        ship.setAttribute("data-orientation", shipOrientation);
        
        if (shipOrientation === "h") {
            ship.style.width = cellSize * shipData.length + "px";
            ship.style.height = cellSize + "px";
    
            while (shipData.notHeadColumns.test(checkCellCoordinate(shipInitialCellNumber))) {
                console.error("Horizontal: " + checkCellCoordinate(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, shipData.name, "h"));
            console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, shipData.name, "h"));
        } else {
            ship.style.width = cellSize + "px";
            ship.style.height = cellSize * shipData.length + "px";
    
            while (shipInitialCellNumber >= shipData.notHeadRows) {
                console.error("Vertical: " + checkCellCoordinate(shipInitialCellNumber));
                shipInitialCellNumber = getRandomNum();
            }
    
            console.log(checkShipsOccupiedCellNumbers(shipInitialCellNumber, shipData.name, "v"));
            console.log(checkShipsOccupiedCellCoordinates(shipInitialCellNumber, shipData.name, "v"));
        }

        switch (shipData.name) {
            case "Aircraft Carrier": aircraftCarrierCurrCellNum.num = shipInitialCellNumber; break;
            case "Battleship": battleshipCurrCellNum.num = shipInitialCellNumber; break;
            case "Cruiser": cruiserCurrCellNum.num = shipInitialCellNumber; break;
            case "Submarine": submarineCurrCellNum.num = shipInitialCellNumber; break;
            case "Destroyer": destroyerCurrCellNum.num = shipInitialCellNumber; break;
            default: console.error("Not a valid ship name");
        }

        usersWaterCell = document.getElementsByClassName("users-water")[0].children[shipInitialCellNumber];
        
        usersWaterCell.appendChild(ship);
    });
}

function Body() {
    useEffect(() => {
        createGameBoardCoordinate();
        createWaterCells();
        placeShipsInUsersWater(ships);
        placeShipsInDockArea();

        dragShip("#aircraft-carrier", "Aircraft Carrier", aircraftCarrierPosition, aircraftCarrierCurrCellNum, checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates);
        dragShip("#battleship", "Battleship", battleShipPosition, battleshipCurrCellNum, checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates);
        dragShip("#cruiser", "Cruiser", cruiserPosition, cruiserCurrCellNum, checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates);
        dragShip("#submarine", "Submarine", submarinePosition, submarineCurrCellNum, checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates);
        dragShip("#destroyer", "Destroyer", destroyerPosition, destroyerCurrCellNum, checkShipsOccupiedCellNumbers, checkShipsOccupiedCellCoordinates);

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