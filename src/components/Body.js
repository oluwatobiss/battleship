import {useEffect} from "react";
import interact from 'interactjs';
import UsersGridArea from "./UsersGridArea";
import ComputersGridArea from "./ComputersGridArea";
import GameButton from "./GameButton";

const position = { x: 0, y: 0 };

function changeOrientation(event) {
    console.log(event.target);
    if (event.target.dataset.orientation === "h") {
        event.target.dataset.orientation = "v";
        event.target.style.width = "40px";
        event.target.style.height = "160px";
    } else {
        event.target.dataset.orientation = "h";
        event.target.style.width = "160px";
        event.target.style.height = "40px";
    }
}
  
interact('#test-ship').draggable({
  listeners: {
    move (event) {
        position.x += event.dx
        position.y += event.dy
        
        event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
  },

  modifiers: [
    interact.modifiers.restrictRect({
      restriction: '.users-board',
    }),

    interact.modifiers.snap({ 
        targets: [interact.snappers.grid({ x: 40, y: 40 })],
        relativePoints: [{ x: 0, y: 0 }],
        offset: 'self',
    })
  ]
})

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
                    ship.setAttribute("data-orientation", "h");
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