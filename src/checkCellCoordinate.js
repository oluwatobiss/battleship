function checkCellCoordinate(num) {
    const lastIndexNum = num.toString().slice(-1);
    let horizontalCoordinate = null;
    let verticalCoordinate = null;

    switch (lastIndexNum) {
        case "0": verticalCoordinate = "A"; break;
        case "1": verticalCoordinate = "B"; break;
        case "2": verticalCoordinate = "C"; break;
        case "3": verticalCoordinate = "D"; break;
        case "4": verticalCoordinate = "E"; break;
        case "5": verticalCoordinate = "F"; break;
        case "6": verticalCoordinate = "G"; break;
        case "7": verticalCoordinate = "H"; break;
        case "8": verticalCoordinate = "I"; break;
        case "9": verticalCoordinate = "J"; break;
        default: console.error("Vertical: Invalid cell input");
    }
    
    num >= 0 && num < 10 ? horizontalCoordinate = 1 
    : num >= 10 && num < 20 ? horizontalCoordinate = 2
    : num >= 20 && num < 30 ? horizontalCoordinate = 3
    : num >= 30 && num < 40 ? horizontalCoordinate = 4
    : num >= 40 && num < 50 ? horizontalCoordinate = 5
    : num >= 50 && num < 60 ? horizontalCoordinate = 6
    : num >= 60 && num < 70 ? horizontalCoordinate = 7
    : num >= 70 && num < 80 ? horizontalCoordinate = 8
    : num >= 80 && num < 90 ? horizontalCoordinate = 9
    : num >= 90 && num < 100 ? horizontalCoordinate = 10
    : console.log("Horizontal: Invalid cell input!");

    return verticalCoordinate + horizontalCoordinate;
}

export default checkCellCoordinate;