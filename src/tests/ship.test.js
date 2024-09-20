import { Ship } from "../ship";

test("invalid ship name", ()=>{
    expect(() => new Ship(3)).toThrowError("Ship name must be string"); 
})

test("invalid ship name", ()=>{
    expect(() => new Ship("bla bla")).toThrowError("Invalid ship name"); 
})

test("iHappy path ship", ()=>{
    let ship = new Ship("carrier")
    expect(ship.length).toBe(5); 
})


test("shit init: happy path", ()=>{
    let ship = new Ship("cruiser");
    expect(ship.length).toBe(3);
})

test("ship hit test", ()=>{
    let ship = new Ship("carrier");
    ship.hit()
    expect(ship.totalHits).toBe(1);
})

test("ship sink test", ()=>{
    let ship = new Ship("cruiser");
    expect(ship.sunk).toBeFalsy();
    ship.hit()
    ship.hit()
    expect(ship.sunk).toBeFalsy();
    ship.hit()
    expect(ship.isSunk()).toBeTruthy();
})