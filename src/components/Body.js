import { useEffect, useState } from "react";
import interact from 'interactjs';
import { 
    UsersGridArea, ComputersGridArea, createGameBoardCoordinate, createWaterCells, placeShipsInWater,
    shipFactory, checkCellCoordinate, getShipOccupiedCellsNumbers, getShipOccupiedCellsCoordinates,
    placeShipsInDockArea, changeShipOrientation, dragShip, addHitOrMissMark, 
} from "../aggregator";

let gameOver = false;
let messageBoard = null;
let gameInfo = null;
let userCells = null;
let pcCells = null;
let userShipsInDockingArea = null;
let pcShipsInDockingArea = null;
let startGameBtn = null;
let restartGameBtn = null;
let userCellsShot = [];
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

const userShips = shipFactory();
const pcShips = shipFactory();
const aircraftCarrierAxisPosition = { x: 0, y: 0 };
const battleShipAxisPosition = { x: 0, y: 0 };
const cruiserAxisPosition = { x: 0, y: 0 };
const submarineAxisPosition = { x: 0, y: 0 };
const destroyerAxisPosition = { x: 0, y: 0 };
const shipToSink = {
    withinAreaFired: false,
    numOfAttempts: 1,
    refCell: null,
    nextCellToShoot: null,
    shootDirection: null,
    shipSunk: false,
};
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

function Body() {
    const [gameStarted, setGameStarted] = useState(false);
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

        messageBoard = document.getElementById("info-area");
        gameInfo = document.getElementById("game-info");
        gameInfo.innerText = "Position your ships";
        userCells = document.querySelectorAll("div[id^='user-cell-']");
        pcCells = document.querySelectorAll("div[id^='pc-cell-']");
        userShipsInDockingArea = document.querySelectorAll(".user-ships .ship-in-docking-area");
        pcShipsInDockingArea = document.querySelectorAll(".pc-ships .ship-in-docking-area");
        startGameBtn = document.getElementById("start-game-btn");
        restartGameBtn = document.getElementById("restart-game-btn");
    }, []);
    
    useEffect(() => {
        const changeAircraftCarrierOrientation = e => changeShipOrientation(gameStarted, e, userShips, "aircraftCarrier", userAircraftCarrCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
        const changeBattleshipOrientation = e => changeShipOrientation(gameStarted, e, userShips, "battleship", userBattleshipCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
        const changeCruiserOrientation = e => changeShipOrientation(gameStarted, e, userShips, "cruiser", userCruiserCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
        const changeSubmarineOrientation = e => changeShipOrientation(gameStarted, e, userShips, "submarine", userSubmarineCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
        const changeDestroyerOrientation = e => changeShipOrientation(gameStarted, e, userShips, "destroyer", userDestroyerCurrHeadCellNum.num, checkCellCoordinate, getShipOccupiedCellsNumbers, userOccupiedCellsNums);
        const checkIfGameIsOver = dockingAreaShips => (Array.from(dockingAreaShips).every(i => i.style.backgroundColor)) && (gameOver = true);

        dragShip(
            gameStarted,
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
            gameStarted,
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
            gameStarted,
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
            gameStarted,
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
            gameStarted,
            "#destroyer", 
            "destroyer",
            destroyerAxisPosition, 
            userDestroyerCurrHeadCellNum, 
            getShipOccupiedCellsNumbers, 
            getShipOccupiedCellsCoordinates,
            userOccupiedCellsNums,
            userOccupiedCellsCoords
        );

        function addBorder() {
            if (gameStarted && !this.style.backgroundColor && !gameOver) {
                this.style.border = "1px solid brown";
                this.style.cursor = "pointer";
            }
        }
        
        function removeBorder() {
            this.style.border = "";
            this.style.cursor = "";
        }

        function pcShoots() {
            if (!gameOver) {
                const getRandomNum = () => Math.floor(Math.random() * 100);
                let cellNum = null;
                
                console.log("Next cell's value is: " + shipToSink.nextCellToShoot);

                if (shipToSink.nextCellToShoot !== null ) {
                    cellNum = shipToSink.nextCellToShoot;
                } else {
                    cellNum = getRandomNum();
                }

                console.log("I aim to shoot: " + cellNum);

                while (userCellsShot.includes(cellNum)) { cellNum = getRandomNum() }
                userCellsShot.push(cellNum);

                console.log("I am shooting: " + cellNum);

                addHitOrMissMark(
                    "user", userCells[cellNum], userOccupiedCellsNums, userShipsInDockingArea, userShips, shipToSink, checkCellCoordinate, userCellsShot
                );
                checkIfGameIsOver(userShipsInDockingArea);
                if (gameOver) {
                    messageBoard.style.backgroundColor = "#ffe0f0";
                    messageBoard.style.borderColor = "red";
                    gameInfo.style.color = "red";
                    gameInfo.innerText = "Oops!!! You lost the Game!";
                }
            }
        }

        function userShoots() {
            if (gameStarted && !this.style.backgroundColor && !gameOver) {
                addHitOrMissMark("pc", this, pcOccupiedCellsNums, pcShipsInDockingArea, pcShips);
                checkIfGameIsOver(pcShipsInDockingArea);
                if (gameOver) {
                    messageBoard.style.backgroundColor = "#e9ffdb";
                    messageBoard.style.borderColor = "green";
                    gameInfo.style.color = "green";
                    gameInfo.innerText = "Congratulations!!! You won the Game!";
                }
                pcShoots();
            }
        }

        document.getElementById("aircraft-carrier").addEventListener("dblclick", changeAircraftCarrierOrientation);
        document.getElementById("battleship").addEventListener("dblclick", changeBattleshipOrientation);
        document.getElementById("cruiser").addEventListener("dblclick", changeCruiserOrientation);
        document.getElementById("submarine").addEventListener("dblclick", changeSubmarineOrientation);
        document.getElementById("destroyer").addEventListener("dblclick", changeDestroyerOrientation);
        pcCells.forEach(c => c.addEventListener("mouseenter", addBorder));
        pcCells.forEach(c => c.addEventListener("mouseleave", removeBorder));
        pcCells.forEach(c => c.addEventListener("click", userShoots));

        return () => {
            document.getElementById("aircraft-carrier").removeEventListener("dblclick", changeAircraftCarrierOrientation);
            document.getElementById("battleship").removeEventListener("dblclick", changeBattleshipOrientation);
            document.getElementById("cruiser").removeEventListener("dblclick", changeCruiserOrientation);
            document.getElementById("submarine").removeEventListener("dblclick", changeSubmarineOrientation);
            document.getElementById("destroyer").removeEventListener("dblclick", changeDestroyerOrientation);
            pcCells.forEach(c => c.removeEventListener("mouseenter", addBorder));
            pcCells.forEach(c => c.removeEventListener("mouseleave", removeBorder));
            pcCells.forEach(c => c.removeEventListener("click", userShoots));
        }
    }, [gameStarted])
    
    function handleStartGameBtnClickEvent() {
        const shipsID = ["#aircraft-carrier", "#battleship", "#cruiser", "#submarine", "#destroyer"];
        shipsID.forEach(i => interact(i).unset());

        setGameStarted(true);
        startGameBtn.style.display = "none";
        restartGameBtn.style.display = "block";
        messageBoard.style.backgroundColor = "whitesmoke";
        messageBoard.style.borderColor = "dimgrey";
        gameInfo.style.color = "dimgrey";
        gameInfo.innerText = "Game Started";
    }

    return (
        <div>
            <section id="info-area">
                <p id="game-info"></p>
            </section>
            <section id="grid-area">
                <UsersGridArea />
                <ComputersGridArea />
            </section>
            <section id="button-area">
                <button id="start-game-btn" onClick={handleStartGameBtnClickEvent}>Start the Game</button>
                <button id="restart-game-btn" onClick={() => window.location.reload()}>Restart Game</button>
            </section>
        </div>
    );
}

export default Body;