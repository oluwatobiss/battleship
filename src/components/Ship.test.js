import Ship from "./Ship";

test("Aircraft Carrier parameter to return Aircraft Carrier object", () => {
    expect(Ship("Aircraft Carrier")).toEqual({
        length: 5,
        hitSpots: [],
        sunk: false
    });
});

test("Battleship parameter to return Battleship object", () => {
    expect(Ship("Battleship")).toEqual({
        length: 4,
        hitSpots: [],
        sunk: false
    });
});

test("Cruiser parameter to return Cruise object", () => {
    expect(Ship("Cruiser")).toEqual({
        length: 3,
        hitSpots: [],
        sunk: false
    });
});

test("Submarine parameter to return Submarine object", () => {
    expect(Ship("Submarine")).toEqual({
        length: 3,
        hitSpots: [],
        sunk: false
    });
});

test("Destroyer parameter to return Destroyer object", () => {
    expect(Ship("Destroyer")).toEqual({
        length: 2,
        hitSpots: [],
        sunk: false
    });
});