function formatInputtedCommand(tempInputtedCommand) {
    return tempInputtedCommand.replace(/,/g, " ").split(" ");
}

function findFirstPlaceStatement(tempCommandArray) {
    // remove all possible items from the array until the first PLACE COMMAND is received
    var indexPositionOfPlace = tempCommandArray.indexOf("PLACE");
    return tempCommandArray.splice(indexPositionOfPlace);
}

function genrateRandomNumber(upperRange) {
    var randomNumber = Math.floor(Math.random() * upperRange);
    return randomNumber;
}
