import GameBoard from "./GameBoard";
import BattleshipsDock from "./BattleshipsDock";

function ComputersGridArea() {
    return (
        <div className="board-n-ships">
            <GameBoard boardOwner="pc-board" waterOwner="pc-water" />
            <BattleshipsDock shipOwner="pc-ships" />
            <p>Computer's Battleships</p>
        </div>
    )
}

export default ComputersGridArea;