import GameBoard from "./GameBoard";
import Battleships from "./Battleships";

function ComputersGridArea() {
    return (
        <div className="board-n-ships">
            <GameBoard boardOwner="pc-board" waterOwner="pc-water" />
            <Battleships shipOwner="pc-ships" />
            <p>Computer's Battleships</p>
        </div>
    )
}

export default ComputersGridArea;