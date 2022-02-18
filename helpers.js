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

function isThereAnotherValidPlace() {}

function commandStructureValidityCheck(receivedCommand) {
    console.log("What is the recieved Command", receivedCommand);

    if (receivedCommand[0] !== validPlaceText) {
        return false;
    } else if (
        parseInt(receivedCommand[1]) < lowerBoundaryLimit ||
        parseInt(receivedCommand[1]) >= upperBoundaryLimit
    ) {
        return false;
    } else if (
        parseInt(receivedCommand[2]) < lowerBoundaryLimit ||
        parseInt(receivedCommand[2]) >= upperBoundaryLimit
    ) {
        return false;
    } else if (!facingDirections.includes(receivedCommand[3])) {
        return false;
    } else {
        return true;
    }
}
