import {useEffect} from "react";
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";

function Body() {
    useEffect(() => {
        const gameBoard = document.getElementsByClassName("game-board");
        const battleshipDock = document.getElementsByClassName("ship-dock");

        [...gameBoard].forEach(board => {
            for(let i = 0; i < 100; i++) {
                const cell = document.createElement('div');

                cell.classList.add("cell");

                board.classList.contains("pc-board")
                ? cell.setAttribute("id", `pc-cell-${i + 1}`)
                : cell.setAttribute("id", `user-cell-${i + 1}`);

                if (i === 0 && board.classList.contains("users-board")) {
                    const ship = document.createElement('div');
                    ship.setAttribute("id", "test-ship");
                    ship.style.width = "160px";
                    ship.style.height = "40px";
                    cell.appendChild(ship);
                }

                board.appendChild(cell);
            }
        });

        [...battleshipDock].forEach(dock => {
            for(let i = 0; i < 5; i++) {
                const ship = document.createElement('div');
                ship.classList.add("ship-in-docking-area");
                dock.appendChild(ship);
            }
        });
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