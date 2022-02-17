// Assumptions:
// 1. Assumed that INPUT means to be a human inputting COMMANDS. NOT VIA GUI / MOUSE CLICKS
// 2. COMMANDS always need to be uppercase when inputted. Lowercase variations are not accepted
// 3. Commands such as 'PLACE PLACE 0,0, NORTH REPORT are invalid
// 4. FLOATS ARE IGNORED and deemed an error. Integers only.

const facingDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
const validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
const validPlaceCommand = "PLACE";
const validMoveCommand = "MOVE";
const validLeftCommand = "LEFT";
const validRightCommand = "RIGHT";
const robotPosition = {
    xPos: null,
    yPos: null,
    direction: "",
};
const gridMovementAllowed = 1;

initaliseRobotStartingPosition();

function reportRobotPosition() {
    console.log(
        "Robot Position is: " +
            robotPosition.xPos +
            "," +
            robotPosition.yPos +
            "," +
            robotPosition.direction
    );
}

function initaliseRobotStartingPosition() {
    // Estblish a random starting position for x & y co-ordinates, direction and update robotPosition

    robotPosition.xPos = genrateRandomNumber(5);
    robotPosition.yPos = genrateRandomNumber(5);

    // establish random facing direction from the 4 directions
    let facingDirectionNumber = genrateRandomNumber(facingDirections.length);
    robotPosition.direction = facingDirections[facingDirectionNumber];

    reportRobotPosition();

    obtainNewCommand();
}

function obtainNewCommand() {
    var tempInputtedCommand = window.prompt("Please enter a valid COMMAND:");
    console.log(tempInputtedCommand);

    // replace commans with a space
    let newStr = tempInputtedCommand.replace(/,/g, " ");
    // console.log(newStr);

    var gj = newStr.split(" ");
    console.log(gj);

    // check for structural validity of PLACE COMMANDS
    var isPlaceCommandValid = commandStructureValidityCheck(gj);
    // console.log("Is valid?", isPlaceCommandValid);

    // now move on to the rest of commands
    if (isPlaceCommandValid) {
        // update robot position
        updateRobotPosition(gj[1], gj[2], gj[3]);
        reportRobotPosition();

        //loop through remaining items in array
        for (var i = 4; i < gj.length; i++) {
            console.log(gj[i]);
            if (gj[i] === "MOVE") {
                console.log("I need to move");
                // take current facing direction
                movementValidityCheck();
            } else if (gj[i] === "LEFT") {
                // console.log("I need to turn left", gj[i]);
                turnLeft();
            } else if (gj[i] === "RIGHT") {
                turnRight;
            } else if (gj[i] === "REPORT") {
                reportRobotPosition();
            }
        }
        // var isMovePossible = movementValidityCheck(gj);
    }

    // moveRobot(gj);
}

function movementValidityCheck() {
    switch (robotPosition.direction) {
        case "EAST":
            // move on the x axis if not out of bounds
            if (robotPosition.xPos + gridMovementAllowed <= 4) {
                robotPosition.xPos += gridMovementAllowed;
                reportRobotPosition();
            } else {
                console.log("Movement on X position not allow > 4");
            }
            break;
        case "WEST":
            // move on the x axis ifn ot out of bounds
            if (robotPosition.xPos - gridMovementAllowed >= 0) {
                robotPosition.xPos -= gridMovementAllowed;
                reportRobotPosition();
            } else {
                console.log("Movement on X position not allow < 0");
            }
            break;

        case "NORTH":
            // move on the y axis if not out of bouds
            if (robotPosition.yPos + gridMovementAllowed <= 4) {
                robotPosition.yPos += gridMovementAllowed;
                reportRobotPosition();
            } else {
                console.log("Movement on y position not allow > 4");
            }

            break;

        case "SOUTH":
            // move on the y axis if not out of bounds
            if (robotPosition.yPos - gridMovementAllowed >= 0) {
                robotPosition.yPos -= gridMovementAllowed;
                reportRobotPosition();
            } else {
                console.log("Movement on Y position not allow < 0");
            }

            break;
    }
}

function commandStructureValidityCheck(receivedCommand) {
    if (receivedCommand[0] !== validPlaceCommand) {
        return false;
    } else if (receivedCommand[1] < 0 || receivedCommand[2] > 5) {
        return false;
    } else if (receivedCommand[2] < 0 || receivedCommand[2] > 5) {
        return false;
    } else if (!facingDirections.includes(receivedCommand[3])) {
        return false;
    } else {
        return true;
    }
}

function moveRobot(receivedCommand) {
    //var text = window.prompt("Wnat is your ommand");
}

function updateRobotPosition(newXPos, newYPos, newDirection) {
    robotPosition.xPos = parseInt(newXPos);
    robotPosition.yPos = parseInt(newYPos);
    robotPosition.direction = newDirection;
}

function genrateRandomNumber(upperRange) {
    var randomNumber = Math.floor(Math.random() * upperRange);
    return randomNumber;
}

function turnLeft() {
    if (robotPosition.direction === "NORTH") {
        robotPosition.direction = "WEST";
        reportRobotPosition();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "SOUTH";
        reportRobotPosition();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "EAST";
        reportRobotPosition();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "NORTH";
        reportRobotPosition();
    }
}

function turnRight() {
    if (robotPosition.direction === "NORTH") {
        robotPosition.direction = "EAST";
        reportRobotPosition();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "SOUTH";
        reportRobotPosition();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "WEST";
        reportRobotPosition();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "NORTH";
        reportRobotPosition();
    }
}

function isOutOfBounds() {
    const boundaryUpperLimit = 4;
    const boundaryLowerLimit = 0;
}
