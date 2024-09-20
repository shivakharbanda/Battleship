export class Ship{
    constructor(name, totalHits = 0, sunk = false) {
        if (typeof(name) == "number") {
            throw new Error("Ship name must be string");
        }
        this.shipMap = this.shipMapInit();

        if (! this.shipMap.has(name)) {
            throw new Error(`Invalid ship name`);
        }
        this.name = name;
        this.length = this.getLength();
        this.totalHits = totalHits;
        this.sunk = false;
    }

    getLength(){
        return this.shipMap.get(this.name);
    }

    shipMapInit(){
        let shipMap = new Map();
        shipMap.set("carrier", 5);
        shipMap.set("battleship", 4);
        shipMap.set("cruiser", 3);
        shipMap.set("submarine", 3)
        shipMap.set("destroyer", 2)
        return shipMap
    }

    hit(){
        if (!this.sunk) {
            this.totalHits += 1;
        }
    }

    isSunk() {
        if (this.totalHits == this.length) {
            this.sunk = true;
            return true
        }
        return false
    }
}

