function shipFactory() {
    const ships = [
        {
            name: "aircraftCarrier",
            id: "aircraft-carrier",
            notHeadColumns: /G|H|I|J/,
            notHeadRows: 60,
            length: 5,
            life: 5,
        },
        {
            name: "battleship",
            id: "battleship",
            notHeadColumns: /H|I|J/,
            notHeadRows: 70,
            length: 4,
            life: 4,
        },
        {
            name: "cruiser",
            id: "cruiser",
            notHeadColumns: /I|J/,
            notHeadRows: 80,
            length: 3,
            life: 3,
        },
        {
            name: "submarine",
            id: "submarine",
            notHeadColumns: /I|J/,
            notHeadRows: 80,
            length: 3,
            life: 3,
        },
        {
            name: "destroyer",
            id: "destroyer",
            notHeadColumns: /J/,
            notHeadRows: 90,
            length: 2,
            life: 2,
        }
    ]

    return ships;
}

export default shipFactory;