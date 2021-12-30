function createGameBoardCoordinate() {
    const gameBoard = document.getElementsByClassName("game-board");
    [...gameBoard].forEach(board => {
        for (let i = 0; i < 121; i++) {
            const cell = document.createElement('div');
            cell.classList.add("coordinate");

            if (i > 0 && i < 11) {
                const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                cell.append(letters[i]);
            }

            if (/^11$|22|33|44|55|66|77|88|99|110/.test(i.toString())) {
                cell.append(i.toString().slice(1));
            }

            board.appendChild(cell);
        }
    });
}

export default createGameBoardCoordinate;