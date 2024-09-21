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

describe('Recive Attack tests', () => {
// tests i should go for
    // Cases:  
    // 
    // 1. if the ship is at the  valid coordinate
    //      1.1 when i attch the health of the ship should go down 
    //          and that coordinate should be turned to "HIT" 
    //          should return "true"
    //      1.2 when i hit that same place again nothing should happen
    //          should return "false"
    //    in all these cases the function should return true and false if that place is already hit
    // 2. ship is not at the valid coordinate
    //      then the coordinate should be turned to X meaning i missed and that place is already hit
    //      receive attack should return "false" in this case
    // 3. passing invalid coordinates should raise error
    let gameBoardObj = new gameBoard();
    let coordinatesShip1 = [0, 0];
    gameBoardObj.placeShip("carrier", coordinatesShip1, "h")

    test("case 1", ()=>{
        let hit = gameBoardObj.receiveAttack([0,0]);
        expect(hit).toBeTruthy();
        gameBoardObj.receiveAttack([0,1])
        gameBoardObj.receiveAttack([0,2])
        gameBoardObj.receiveAttack([0,3])
        gameBoardObj.receiveAttack([0,4])
        let struckShip = gameBoardObj.shipMap.get("carrier")
        expect(struckShip.sunk).toBeTruthy();

        expect(gameBoardObj.board[0][4]).toBe("H")
    })

    test("case 2", ()=>{
        console.log(gameBoardObj.board[5])
        let hit = gameBoardObj.receiveAttack([5,5]);
        expect(gameBoardObj.board[5][5]).toBe("M")
        expect(hit).toBeFalsy();
    })

    test("case 3", ()=>{
        expect(()=>{
            let hit = gameBoardObj.receiveAttack([100, 100]);
        }).toThrowError();
    })
})
