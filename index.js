// Assumptions:
// 1. Assumed that INPUT means to be a human inputting COMMANDS. NOT VIA GUI / MOUSE CLICKS
// 2. COMMANDS always need to be uppercase when inputted. Lowercase variations are not accepted
// 3. Commands such as 'PLACE PLACE 0,0, NORTH REPORT are invalid
// 4. FLOATS ARE IGNORED and deemed an error. Integers only.

document.getElementById("myForm").addEventListener("submit", myFunction);
var qq = document.getElementById("[4,0]");
console.log("QQ is", qq);
var img = document.createElement("img");
img.src = "robotTankSquareEast.png";
qq.appendChild(img);

function myFunction(e) {
    e.preventDefault();
    // alert("The form was submitted");
    let ax = document.getElementById("commandText");
    console.log("ax is", ax.value);
}

const testCases = [
    "MOVE LEFT PLACE 0,0,NORTH MOVE REPORT",
    "PLACE 0,0,NORTH LEFT REPORT PLACE 4,4,NORTH LEFT REPORT",
    "PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE MOVE MOVE MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE MOVE MOVE MOVE RIGHT RIGHT MOVE REPORT",
];

const facingDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
const validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
const validPlaceText = "PLACE";
const validMoveText = "MOVE";
const validLeftText = "LEFT";
const validRightText = "RIGHT";
const validReportText = "REPORT";
const robotPosition = {
    xPos: null,
    yPos: null,
    direction: "",
};
const gridMovementAllowed = 1;
const upperBoundaryLimit = 4;
const lowerBoundaryLimit = 0;

var placeCommandExecuted = null;

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

    // robotPosition.xPos = genrateRandomNumber(5);
    // robotPosition.yPos = genrateRandomNumber(5);

    // establish random facing direction from the 4 directions
    // let facingDirectionNumber = genrateRandomNumber(facingDirections.length);
    // robotPosition.direction = facingDirections[facingDirectionNumber];

    // reportRobotPosition();

    obtainNewCommand();
}

function obtainNewCommand() {
    // var tempInputtedCommand = window.prompt("Please enter a valid COMMAND:");
    // console.log(tempInputtedCommand);
    var tempInputtedCommand = testCases[1];

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
                reportRobotPosition();
            } else {
                console.log("Movement on X position not allow > 4");
            }
            break;
        case "WEST":
            // move on the x axis ifn ot out of bounds
            if (
                robotPosition.xPos - gridMovementAllowed >=
                lowerBoundaryLimit
            ) {
                robotPosition.xPos -= gridMovementAllowed;
                reportRobotPosition();
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
                reportRobotPosition();
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
                reportRobotPosition();
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
        receivedCommand[1] < lowerBoundaryLimit ||
        receivedCommand[2] >= upperBoundaryLimit
    ) {
        return false;
    } else if (
        receivedCommand[2] < lowerBoundaryLimit ||
        receivedCommand[2] >= upperBoundaryLimit
    ) {
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
        // reportRobotPosition();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "SOUTH";
        // reportRobotPosition();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "EAST";
        // reportRobotPosition();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "NORTH";
        // reportRobotPosition();
    }
}

function turnRight() {
    if (robotPosition.direction === "NORTH") {
        robotPosition.direction = "EAST";
        // reportRobotPosition();
    } else if (robotPosition.direction === "EAST") {
        robotPosition.direction = "SOUTH";
        // reportRobotPosition();
    } else if (robotPosition.direction === "SOUTH") {
        robotPosition.direction = "WEST";
        // reportRobotPosition();
    } else if (robotPosition.direction === "WEST") {
        robotPosition.direction = "NORTH";
        // reportRobotPosition();
    }
}

function formatInputtedCommand(tempInputtedCommand) {
    return tempInputtedCommand.replace(/,/g, " ").split(" ");
}

function findFirstPlaceStatement(tempCommandArray) {
    // remove all possible items from the array until the first PLACE COMMAND is received
    var indexPositionOfPlace = tempCommandArray.indexOf("PLACE");
    return tempCommandArray.splice(indexPositionOfPlace);
}
