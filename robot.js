function obtainNewCommand(submittedValue) {
    // var tempInputtedCommand = window.prompt("Please enter a valid COMMAND:");
    // console.log(tempInputtedCommand);
    // var tempInputtedCommand = testCases[1];
    var tempInputtedCommand = submittedValue;

    // replace all commas with spaces and convert to array for easier processing
    var tempCommandArray = formatInputtedCommand(tempInputtedCommand);

    // return the array with the first instance of the PLACE COMMAND
    var refinedCommandArray = findFirstPlaceStatement(tempCommandArray);

    // check for parameter validity of the PLACE COMMAND. i.e does it have a subsequent 2 integers and a direction
    var isPlaceCommandValid = commandStructureValidityCheck(
        refinedCommandArray
    );

    // now move on to the rest of commands
    if (isPlaceCommandValid) {
        // update robot position by destructuring
        var xPos, yPos, facingDirection, restOfArray;
        [, xPos, yPos, facingDirection, ...restOfArray] = refinedCommandArray;
        console.log("REST IS", restOfArray);
        updateRobotPosition(xPos, yPos, facingDirection);
        reportRobotPosition();

        //loop through remaining items in array
        for (var i = 0; i < restOfArray.length; i++) {
            // console.log(restOfArray[i]);
            if (restOfArray[i] === validMoveText) {
                // console.log("I need to move");
                // take current facing direction
                movementValidityCheck();
            } else if (restOfArray[i] === validLeftText) {
                // console.log("I need to turn left", restOfArray[i]);
                turnLeft();
            } else if (restOfArray[i] === validRightText) {
                turnRight();
            } else if (restOfArray[i] === validReportText) {
                reportRobotPosition();
            } else {
                console.log("WTF", restOfArray[i]);
            }
        }
    }
}

function movementValidityCheck() {
    switch (robotPosition.direction) {
        case "EAST":
            // move on the x axis if robot does not fallnot out of bounds
            if (
                robotPosition.xPos + gridMovementAllowed <=
                upperBoundaryLimit
            ) {
                robotPosition.xPos += gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                console.log("Movement on X position not allow > 4");
            }
            break;
        case "WEST":
            // move on the x axis if not out of bounds
            if (
                robotPosition.xPos - gridMovementAllowed >=
                lowerBoundaryLimit
            ) {
                robotPosition.xPos -= gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                console.log("Movement on X position not allow < 0");
            }
            break;

        case "NORTH":
            // move on the y axis if not out of bouds
            if (
                robotPosition.yPos + gridMovementAllowed <=
                upperBoundaryLimit
            ) {
                robotPosition.yPos += gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                console.log("Movement on y position not allow > 4");
            }

            break;

        case "SOUTH":
            // move on the y axis if not out of bounds
            if (
                robotPosition.yPos - gridMovementAllowed >=
                lowerBoundaryLimit
            ) {
                robotPosition.yPos -= gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                console.log("Movement on Y position not allow < 0");
            }

            break;
    }
}

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

function updateImageCoordinatesShow() {
    robotPosition.ImageStringCooridinates =
        "[" + robotPosition.xPos + "," + robotPosition.yPos + "]";

    var imageToAdd = document.getElementById(
        robotPosition.ImageStringCooridinates
    );

    switch (robotPosition.direction) {
        case "NORTH":
            imageToAdd.appendChild(imgNorth);
            break;
        case "SOUTH":
            imageToAdd.appendChild(imgSouth);
            break;
        case "WEST":
            imageToAdd.appendChild(imgWest);
            break;
        case "EAST":
            imageToAdd.appendChild(imgEast);
            break;
    }
}

function updateRobotPosition(newXPos, newYPos, newDirection) {
    robotPosition.xPos = parseInt(newXPos);
    robotPosition.yPos = parseInt(newYPos);
    robotPosition.direction = newDirection;
}

function turnLeft() {
    if (robotPosition.direction === "NORTH") {
        robotPosition.direction = "WEST";
        // reportRobotPosition();
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "SOUTH";
        updateImageCoordinatesShow();
        // reportRobotPosition();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "EAST";
        updateImageCoordinatesShow();
        // reportRobotPosition();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "NORTH";
        // reportRobotPosition();
        updateImageCoordinatesShow();
    }
}

function turnRight() {
    if (robotPosition.direction === "NORTH") {
        robotPosition.direction = "EAST";
        // reportRobotPosition();
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "SOUTH";
        // reportRobotPosition();
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "WEST";
        // reportRobotPosition();
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "NORTH";
        updateImageCoordinatesShow();
        // reportRobotPosition();
    }
}
