import GameBoard from "./GameBoard";
import Battleships from "./Battleships";

function UsersGridArea() {
    return (
        <div className="board-n-ships">
            <GameBoard boardOwner="users-board" />
            <Battleships shipOwner="users-ships" />
            <p>Your Battleships</p>
        </div>
    )
}

export default UsersGridArea;