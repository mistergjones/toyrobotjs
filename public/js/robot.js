function movementValidityCheck() {
    switch (robotPosition.direction) {
        case validEastText:
            // move on the x axis if robot does not fallnot out of bounds
            if (
                robotPosition.xPos + gridMovementAllowed <=
                upperBoundaryLimit
            ) {
                robotPosition.xPos += gridMovementAllowed;
                updateImageCoordinatesShow();
            } else {
                isToyMoveInvalid = true;
            }
            break;
        case validWestText:
            // move on the x axis if not out of bounds
            if (
                robotPosition.xPos - gridMovementAllowed >=
                lowerBoundaryLimit
            ) {
                robotPosition.xPos -= gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                isToyMoveInvalid = true;
            }
            break;

        case validNorthText:
            // move on the y axis if not out of bounds
            if (
                robotPosition.yPos + gridMovementAllowed <=
                upperBoundaryLimit
            ) {
                robotPosition.yPos += gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                isToyMoveInvalid = true;
            }

            break;

        case validSouthText:
            // move on the y axis if not out of bounds
            if (
                robotPosition.yPos - gridMovementAllowed >=
                lowerBoundaryLimit
            ) {
                robotPosition.yPos -= gridMovementAllowed;

                updateImageCoordinatesShow();
            } else {
                isToyMoveInvalid = true;
            }

            break;
    }
}

function obtainImageCordinates() {
    robotPosition.ImageStringCooridinates =
        "[" + robotPosition.xPos + "," + robotPosition.yPos + "]";
    return document.getElementById(robotPosition.ImageStringCooridinates);
}

function removePreviousImage(image) {
    imageElementToRemove = obtainImageCordinates().removeChild(image);
}

function updateImageCoordinatesShow() {
    var imageElementToAdd = obtainImageCordinates();

    switch (robotPosition.direction) {
        case "NORTH":
            imageElementToAdd.appendChild(imgNorth);
            break;
        case "SOUTH":
            imageElementToAdd.appendChild(imgSouth);
            break;
        case "WEST":
            imageElementToAdd.appendChild(imgWest);
            break;
        case "EAST":
            imageElementToAdd.appendChild(imgEast);
            break;
    }
}

function updateRobotPosition(robotInformation) {
    // destructure and update robot positions
    var xPos, yPos, facingDirection;
    [, xPos, yPos, facingDirection] = robotInformation;

    robotPosition.xPos = parseInt(xPos);
    robotPosition.yPos = parseInt(yPos);
    robotPosition.direction = facingDirection;
}

function turnLeft() {
    if (robotPosition.direction === validNorthText) {
        robotPosition.direction = validWestText;
        removePreviousImage(imgNorth);
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validWestText) {
        robotPosition.direction = validSouthText;
        removePreviousImage(imgWest);
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validSouthText) {
        robotPosition.direction = validEastText;
        removePreviousImage(imgSouth);

        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validEastText) {
        robotPosition.direction = validNorthText;
        removePreviousImage(imgEast);
        updateImageCoordinatesShow();
    }
}

function turnRight() {
    if (robotPosition.direction === validNorthText) {
        robotPosition.direction = validEastText;
        removePreviousImage(imgNorth);
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validEastText) {
        robotPosition.direction = validSouthText;
        removePreviousImage(imgEast);
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validSouthText) {
        robotPosition.direction = validWestText;
        removePreviousImage(imgSouth);
        updateImageCoordinatesShow();
    } else if (robotPosition.direction === validWestText) {
        robotPosition.direction = validNorthText;
        removePreviousImage(imgWest);
        updateImageCoordinatesShow();
    }
}
