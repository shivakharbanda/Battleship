import { gameBoard } from "../gameBoard"

test("invalid ship name", ()=>{
    let gameBoardObj = new gameBoard();

    expect(gameBoardObj.board.length).toEqual(10);

    expect(gameBoardObj.board[0].length).toEqual(10);
})


// case 1 happy path
//      use a valid ship name and put that ship on a valid coordinate and orientation

// case 2 big ship no size
//      put the ship bigger than the size available

// case 3 already placed ship
//      put the ship but there is already a ship present where it is being set
describe('Test the ship placing abilities in horizontal sense', () => {
    test("place ship", ()=>{
        let gameBoardObj = new gameBoard();
        let coordinates = [0, 0]
        gameBoardObj.placeShip("carrier", coordinates, "H")
    
        expect(gameBoardObj.board[coordinates[0]].slice(coordinates[1], coordinates[1] + 5)).toEqual(
            ["carrier", "carrier", "carrier", "carrier", "carrier"]
        )
    })
    test("get error if space not enough", ()=>{
        
        expect(()=>{
                let gameBoardObj = new gameBoard();
                let coordinates = [0, 6]
                gameBoardObj.placeShip("carrier", coordinates, "H")
            }
        ).toThrowError();
    })
    test("ship over ship", ()=>{
        
        expect(()=>{
                let gameBoardObj = new gameBoard();
                let coordinates = [0, 0]
                gameBoardObj.placeShip("carrier", coordinates, "H")
                gameBoardObj.placeShip("battleship", [0, 2], "H")
            }
        ).toThrowError();
    })

    test("2 ships in one row", ()=>{
        let gameBoardObj = new gameBoard();
        let coordinatesShip1 = [0, 0];
        let coordinateShip2 = [0, 5]

        gameBoardObj.placeShip("carrier", coordinatesShip1, "H")
        gameBoardObj.placeShip("battleship", coordinateShip2, "H")
        expect(
            gameBoardObj.board[coordinatesShip1[0]]
        ).toEqual(
            ["carrier", "carrier", "carrier", "carrier", "carrier", "battleship", "battleship", "battleship", "battleship", 0]
        );
    })
})


describe('Test the ship placing abilities in Vertical sense', () => {
    test("place ship", ()=>{
        let gameBoardObj = new gameBoard();
        let coordinates = [0, 0]
        gameBoardObj.placeShip("carrier", coordinates, "V")
        let columnWhereShipPlaced = gameBoardObj._getBoardColumn(coordinates[1]).slice(coordinates[0], coordinates[0] + 5)
        expect(columnWhereShipPlaced).toEqual(
                ["carrier", "carrier", "carrier", "carrier", "carrier"]
            )
    })
    test("get error if space not enough", ()=>{
        
        expect(()=>{
                let gameBoardObj = new gameBoard();
                let coordinates = [6, 0]
                gameBoardObj.placeShip("carrier", coordinates, "V")
            }
        ).toThrowError();
    })
    test("ship over ship", ()=>{
        
        expect(()=>{
                let gameBoardObj = new gameBoard();
                let coordinates = [0, 0]
                gameBoardObj.placeShip("carrier", coordinates, "V")
                gameBoardObj.placeShip("battleship", [2, 0], "V")
            }
        ).toThrowError();
    })

    test("2 ships in one row", ()=>{
        let gameBoardObj = new gameBoard();
        let coordinatesShip1 = [0, 5];
        let coordinateShip2 = [5, 5]

        gameBoardObj.placeShip("carrier", coordinatesShip1, "V")
        gameBoardObj.placeShip("battleship", coordinateShip2, "V")
        expect(
            gameBoardObj._getBoardColumn(coordinatesShip1[1])
        ).toEqual(
            ["carrier", "carrier", "carrier", "carrier", "carrier", "battleship", "battleship", "battleship", "battleship", 0]
        );
    })
})
