import { Ship } from "../ship";

test("shit init: happy path", ()=>{
    let ship = new Ship(3);

    expect(ship.length).toBe(3);
})

test("ship hit test", ()=>{
    let ship = new Ship(3);
    ship.hit()
    expect(ship.totalHits).toBe(1);
})

test("ship sink test", ()=>{
    let ship = new Ship(3);
    expect(ship.sunk).toBeFalsy();
    ship.hit()
    ship.hit()
    expect(ship.sunk).toBeFalsy();
    ship.hit()
    expect(ship.isSunk()).toBeTruthy();
})