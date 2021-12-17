function GameBoard(props) {
    return (
        <div className={`game-board ${props.boardOwner}`}>
            <div className={`game-water ${props.waterOwner}`}></div>
        </div>
    );
}

export default GameBoard;