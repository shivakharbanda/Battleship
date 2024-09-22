import { Ship } from "./ship";

export class gameBoard {

    constructor(size = 10) {
        this.board = [];
        for (let i = 0;i < size ;i++ ) {
            let row = new Array(size).fill(0);
            this.board.push(row);
        }
        this.shipMap = new Map();
        this.sunkenShips = new Set();
    }

    placeShipsRandomly() {
        let ships = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];

        while(ships.length > 0) {
            let randomStartCoordinate = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            let orientation = ["h", "v"]
            let ship = ships.pop();
            try {
                this.placeShip(ship, randomStartCoordinate, orientation[Math.floor(Math.random() * 2)]);
            } catch(e) {
                ships.push(ship)
                continue;
            }
            
        }
    }
    
    placeShip(name, startCoordinate, orientation = "h") {

        orientation = orientation.toLowerCase();

        if (orientation != 'h' && orientation != 'v') {
            throw new Error(`Value Error: Invalid Orientation value - ${orientation}`);
            
        }
        let ship = new Ship(name);
        if (orientation == "h") {
            let row = startCoordinate[0];
            this.checkIfShipAlreadyThere(startCoordinate, orientation, ship.length);

            row = this.board[row]
            let col = startCoordinate[1]
             
            for (let i = 0; i < ship.length; i ++) {
                row[col] = ship.name;
                col += 1;
            }
        } else {
            let column = startCoordinate[1];
            let row = startCoordinate[0]
            this.checkIfShipAlreadyThere(startCoordinate, orientation, ship.length);
            for (let i = 0; i < ship.length; i ++) {
                this.board[row][column] = ship.name;
                row += 1;
            }
        }
        this.shipMap.set(name, ship);
    }

    receiveAttack(coordinate) {
        let row = coordinate[0];
        let col = coordinate[1];

        let location;
        try {
            location = this.board[row][col];
        } catch(e){
            throw new Error("Invalid Coordinates");
        }

        if (location == 0) {
            // no ship present
            this.board[row][col] = "M"
            return [false , this.checkIfAllShipsSunk()];
        }

        if (this.shipMap.has(location)) {
            let ship = this.shipMap.get(location);
            this.board[row][col] = "H"
            ship.hit();

            if (ship.isSunk()) {
                this.sunkenShips.add(ship);
            }
            return [true , this.checkIfAllShipsSunk()];
        }

        return [false , this.checkIfAllShipsSunk()];
    }

    checkIfAllShipsSunk(){
        if(this.sunkenShips.size == this.shipMap.size) {
            return true;
        }
        return false;
    }

    _getBoardColumn(column) {
        let columnArr = [];
        let row = 0
        while(columnArr.length !=this.board.length) {
            columnArr.push(this.board[row][column]);
            row ++;
        }
        return columnArr;
    }

    checkIfShipAlreadyThere(startCoordinate, orientation, shipLength) {
        if (orientation == "h") {
            let row = startCoordinate[0];
            let rowToCheck = this.board[row];

            let columnStart = startCoordinate[1];

            while(shipLength > 0) {
                if (rowToCheck[columnStart] == undefined) {
                    throw new Error(`not enough space to put the ship of length ${shipLength}`);
                }
                if (rowToCheck[columnStart] != 0) {
                    throw new Error("Ship already at designated coordinate. Place it somewhere else");
                }
                
                columnStart += 1;
                shipLength -= 1;
            }
        } else {
            let columnToCheck = startCoordinate[1];
            let row = startCoordinate[0]
            while(shipLength > 0) {
                if (this.board[row][columnToCheck] == undefined) {
                    throw new Error(`not enough space to put the ship of length ${shipLength}`);
                }
                if (this.board[row][columnToCheck] != 0) {
                    throw new Error("Ship already at designated coordinate. Place it somewhere else");
                }
                row += 1;
                shipLength -= 1;
            }
        }
        
    }

}

