// Assumptions: UPDATED
// 1. Assumed that simulated tabletop actually now means GUI.
// 2. INPUT means to be a human inputting COMMANDS
// 3. COMMANDS always need to be uppercase when inputted. Lowercase variations are not accepted
// 4. FLOATS ARE IGNORED and deemed an error. Integers only.

// OBTAIN DOM ELEMENTS
document.getElementById("myForm").addEventListener("submit", myFunction);
// var gridPosition = document.getElementById("[4,0]");
// console.log("gridPosition is", gridPosition);
var imgEast = document.createElement("img");
imgEast.src = "./assets/robotTankSquareEast.png";
var imgNorth = document.createElement("img");
imgNorth.src = "./assets/robotTankSquareNorth.png";
var imgSouth = document.createElement("img");
imgSouth.src = "./assets/robotTankSquareSouth.png";
var imgWest = document.createElement("img");
imgWest.src = "./assets/robotTankSquareWest.png";

// gridPosition.appendChild(imgWest);

function myFunction(e) {
    e.preventDefault();
    // alert("The form was submitted");
    let ax = document.getElementById("commandText");
    console.log("ax is", ax.value);
    obtainNewCommand(ax.value);
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
    ImageStringCooridinates: "",
};
const gridMovementAllowed = 1;
const upperBoundaryLimit = 4;
const lowerBoundaryLimit = 0;

var placeCommandExecuted = null;

// initaliseRobotStartingPosition();

function initaliseRobotStartingPosition() {
    // Estblish a random starting position for x & y co-ordinates, direction and update robotPosition
    // robotPosition.xPos = genrateRandomNumber(5);
    // robotPosition.yPos = genrateRandomNumber(5);
    // establish random facing direction from the 4 directions
    // let facingDirectionNumber = genrateRandomNumber(facingDirections.length);
    // robotPosition.direction = facingDirections[facingDirectionNumber];
    // reportRobotPosition();
    // obtainNewCommand();
}
