// Function to ensure that the test data supplied is in correct format
function formatInputtedCommand(tempInputtedCommand) {
    // cater for placements of comments/spaces to produce same results
    var tempArray = tempInputtedCommand.replace(/,/g, "").split(" ");

    return tempArray;
}

function commandStructureValidityCheck(receivedCommand) {
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
