import { gameBoard } from "./gameBoard";
import { getGameBoardHtml } from "./utils";

let gameBoardP1 = new gameBoard();
let gameBoardP2 = new gameBoard();


// shipMap.set("carrier", 5);
// shipMap.set("battleship", 4);
// shipMap.set("cruiser", 3);
// shipMap.set("submarine", 3)
// shipMap.set("destroyer", 2)

gameBoardP1.placeShip("carrier", [2,3], "v")
gameBoardP2.placeShip("carrier", [2,3], "h")

gameBoardP2.receiveAttack([2,4])

gameBoardP2.receiveAttack([2,2])

let gameBoardP1Html = getGameBoardHtml(gameBoardP1.board);

let p1GridDiv = document.querySelector(".grid-1");
p1GridDiv.append(gameBoardP1Html)

let gameBoardP2Html = getGameBoardHtml(gameBoardP2.board);

let p2GridDiv = document.querySelector(".grid-2");
p2GridDiv.append(gameBoardP2Html)

p2GridDiv.addEventListener("click", (e)=>{
    let target = e.target;

    let cellCoordinate = [target.getAttribute("data-rowIdx"), target.getAttribute("data-colIdx")]
    
    gameBoardP2.receiveAttack(cellCoordinate);

    let gameBoardP2Html = getGameBoardHtml(gameBoardP2.board);

    let p2GridDiv = document.querySelector(".grid-2");
    p2GridDiv.textContent = "";
    p2GridDiv.append(gameBoardP2Html)


})





