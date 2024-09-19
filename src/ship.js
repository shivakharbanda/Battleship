export class Ship{
    constructor(length, totalHits = 0, sunk = false) {
        this.length = length;
        this.totalHits = totalHits;
        this.sunk = false;
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

