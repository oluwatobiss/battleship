function changeShipOrientation(e, ships, shipName, currentCellNum, cellCoord) {
    const cellSize = document.getElementsByClassName("users-water")[0].children[0].clientWidth;
    let shipData = null;

    for (const obj of ships) {
        if  (obj.name === shipName) {
            shipData = obj;
        }
    }

    if (e.target.dataset.orientation === "h") {
        if (currentCellNum < shipData.notHeadRows) {
            e.target.dataset.orientation = "v";
            e.target.style.width = cellSize + "px";
            e.target.style.height = cellSize * shipData.length + "px";
        }
    } else {
        if (!shipData.notHeadColumns.test(cellCoord(currentCellNum))) {
            e.target.dataset.orientation = "h";
            e.target.style.width = cellSize * shipData.length + "px";
            e.target.style.height = cellSize + "px";
        }
    }
}

export default changeShipOrientation;