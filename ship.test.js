import { Ship } from "./ship";

test("shit init: happy path", ()=>{
    let ship = new Ship(3);

    expect(ship.length).toBe(3);
})