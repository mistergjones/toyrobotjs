// OBTAIN DOM ELEMENTS
document.getElementById("myForm").addEventListener("submit", formSubmission);
// var gridPosition = document.getElementById("[4,0]");
// console.log("gridPosition is", gridPosition);
var imgEast = document.createElement("img");
imgEast.src = "./images/robotTankSquareEast.png";
var imgNorth = document.createElement("img");
imgNorth.src = "./images/robotTankSquareNorth.png";
var imgSouth = document.createElement("img");
imgSouth.src = "./images/robotTankSquareSouth.png";
var imgWest = document.createElement("img");
imgWest.src = "./images/robotTankSquareWest.png";

// gridPosition.appendChild(imgWest);

// CONSTANTS FOR THE TOY ROBOT
const facingDirections = ["NORTH", "EAST", "SOUTH", "WEST"];
const validEastText = "EAST";
const validNorthText = "NORTH";
const validWestText = "WEST";
const validSouthText = "SOUTH";
const validCommands = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];
const validPlaceText = "PLACE";
const validMoveText = "MOVE";
const validLeftText = "LEFT";
const validRightText = "RIGHT";
const validReportText = "REPORT";

// ESTABLISH TOY ROBOT OBJECT
const robotPosition = {
    xPos: null,
    yPos: null,
    direction: "",
    ImageStringCooridinates: "",
};

// GRID MOVEMENTS AND BOUNDARY LIMIT SETTINGS
const gridMovementAllowed = 1;
const upperBoundaryLimit = 4;
const lowerBoundaryLimit = 0;

// BOOLEANS TO TRACK VALID COMMANDS
let isAllowSubsequentCommands = null; //TRUE = YES
let isToyMoveInvalid = null; //TRUE = YES

function formSubmission(e) {
    e.preventDefault();
    const inputtedCommand = document.getElementById("commandText");

    validateToyRobotCommands(inputtedCommand);
    // reset the input to blank
    document.getElementById("commandText").value = "";
}

function validateToyRobotCommands(inputtedCommand) {
    // console.log("inputtedCommand is", inputtedCommand.value);
    var cleansedInput = formatInputtedCommand(inputtedCommand.value);

    // If a wrong command, prevent all subsequent moves.
    if (!validCommands.includes(cleansedInput[0])) {
        isAllowSubsequentCommands = false;
    }

    // determine if VALID PLACE COMMAND.
    if (cleansedInput[0] === validPlaceText) {
        // check to make sure it is a valid pplace Satement
        const isValidPlaceCommand = commandStructureValidityCheck(
            cleansedInput
        );

        if (isValidPlaceCommand) {
            updateRobotPosition(cleansedInput);

            updateImageCoordinatesShow();
            isAllowSubsequentCommands = true;
        } else {
            isAllowSubsequentCommands = false;
        }
    }
    // for all other valid commands
    if (isAllowSubsequentCommands === true) {
        if (cleansedInput[0] === validReportText) {
            reportRobotPosition();
        } else if (cleansedInput[0] === validLeftText) {
            turnLeft();
        } else if (cleansedInput[0] === validRightText) {
            turnRight();
        } else if (cleansedInput[0] === validMoveText) {
            movementValidityCheck();
        }
    }
}
