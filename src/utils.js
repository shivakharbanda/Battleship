
export function getGameBoardHtml(gameBoard, target){
    let div = document.createElement("div");

    for (let rowIdx = 0;rowIdx < gameBoard.length; rowIdx++) {
        let row = gameBoard[rowIdx];
        for (let colIdx = 0; colIdx < row.length; colIdx ++) {
            let cell = row[colIdx];
            let gridCell = createGridCell(cell, [rowIdx, colIdx])
            div.append(gridCell)
        }
    }
    return div
}

function createGridCell(value, coordinate) {
    let gridCell = document.createElement("div");

    gridCell.classList.add("cell");

    if (value == 0) {
        gridCell.classList.add("empty-cell")
    } else if (value.toLowerCase() == "h") {
        gridCell.classList.add("cell-hit")
    } else if (value.toLowerCase() == "m") {
        gridCell.classList.add("cell-miss")
    } else {
        gridCell.classList.add("contains-ship")
    }

    gridCell.setAttribute("data-rowIdx", coordinate[0]);
    gridCell.setAttribute("data-colIdx", coordinate[1]);

    return gridCell
}