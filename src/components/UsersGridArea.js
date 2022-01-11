import GameBoard from "./GameBoard";
import BattleshipsDock from "./BattleshipsDock";

function UsersGridArea() {
    return (
        <div className="board-n-ships">
            <GameBoard boardOwner="users-board" waterOwner="users-water" />
            <BattleshipsDock shipOwner="users-ships" />
            <p>Your Battleships</p>
        </div>
    )
}

export default UsersGridArea;