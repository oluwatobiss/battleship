import checkShipPosition from "./Ship";

describe("Ship's position on the board", () => {
    test("Cell 0 to be A1", () => {
        expect(checkShipPosition(0)).toBe("A1");
    });

    test("Cell 45 to be F5", () => {
        expect(checkShipPosition(45)).toBe("F5");
    });

    test("Cell 72 to be C8", () => {
        expect(checkShipPosition(72)).toBe("C8");
    });

    test("Cell 98 to be I10", () => {
        expect(checkShipPosition(98)).toBe("I10");
    });
})