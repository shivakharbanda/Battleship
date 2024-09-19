export class Ship{
    constructor(length, totalHits = 0, sunk = false) {
        this.length = length;
        this.totalHits = totalHits;
        this.sunk = sunk;
    }

    hit(){
        this.totalHits += 1;
    }

    isSunk() {
        if (this.hitTotal >= this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }
}

