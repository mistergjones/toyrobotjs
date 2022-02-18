const testCases = [
    "MOVE LEFT PLACE 0,0,NORTH MOVE REPORT",
    "PLACE 0,0,NORTH LEFT REPORT PLACE 4,4,NORTH LEFT REPORT",
    "PLACE 1,2,EAST MOVE MOVE LEFT MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE MOVE MOVE MOVE REPORT",
    "PLACE 1,2,EAST MOVE MOVE MOVE MOVE LEFT MOVE MOVE MOVE MOVE RIGHT RIGHT MOVE REPORT",
];

function obtainNewCommand(submittedValue) {
    var remainingArray = [];
    var validPlaceStatement = null;

    //var tempInputtedCommand = window.prompt("Please enter a valid COMMAND:");
    // console.log(tempInputtedCommand);
    // var tempInputtedCommand = testCases[1];
    var tempInputtedCommand = submittedValue;

    // replace all commas with spaces and convert to array for easier processing
    var cleansedArray = formatInputtedCommand(tempInputtedCommand);

    // return the array with the first instance of the PLACE COMMAND via an index position
    var refinedCommandArray = findFirstPlaceStatement(cleansedArray);

    // check for parameter validity of the PLACE COMMAND. i.e does it have a subsequent 2 integers and a direction
    var isFirstPlaceCommandValid = commandStructureValidityCheck(
        refinedCommandArray
    );

    // Execute first valid PLACE command
    if (isFirstPlaceCommandValid) {
        // update robot position by destructuring
        // TODO: dupliate code below
        var xPos, yPos, facingDirection, restOfArray;
        [, xPos, yPos, facingDirection, ...restOfArray] = refinedCommandArray;
        //console.log("REST OF ARRAY IS", restOfArray);
        updateRobotPosition(xPos, yPos, facingDirection);
        reportRobotPosition();
        updateImageCoordinatesShow();
        // only retain commands after the valid place statement
        remainingArray = restOfArray;
    }

    // check if

    console.log("The remaining array is", remainingArray);
    console.log(remainingArray.length);
    for (var i = 0; i < remainingArray.length; i++) {
        // happy path length
        if (remainingArray[i] === "PLACE" && i + 3 < remainingArray.length) {
            console.log("ZZZZZello", i);
            // build the array string to be checked
            var buildString =
                restOfArray[i] +
                " " +
                restOfArray[i + 1] +
                " " +
                restOfArray[i + 2] +
                " " +
                restOfArray[i + 3];

            // convert string to array
            var correctPlaceSyntax = formatInputtedCommand(buildString);
            console.log("The formatted Command is: ", correctPlaceSyntax);

            // check if we have a valid command strucutre
            var isTrue = commandStructureValidityCheck(correctPlaceSyntax);
            console.log("Are we true?", isTrue);

            // TODO: duplicate code here and above
            if (isTrue) {
                console.log("ARE WER HERE?");
                var xPos, yPos, facingDirection, restOfArray;
                [
                    ,
                    xPos,
                    yPos,
                    facingDirection,
                    ...restOfArray
                ] = correctPlaceSyntax;
                updateRobotPosition(xPos, yPos, facingDirection);
                updateImageCoordinatesShow();
                reportRobotPosition();

                remainingArray = restOfArray;
                console.log("The reaming array is:", remainingArray);
            }

            break;
        } else {
            console.log("No valid commands");
        }
    }

    // console.log("is the command true", isTrue);

    // PLACE 1,1,NORTH PLACE 2,3,NORTH
    // PLACE 1,1,NORTH PLACE 2,3,NORTH MOVE

    // need to loop through for only valid conditions

    // loop through remaining items in array
    // for (var i = 0; i < restOfArray.length; i++) {
    //     if (restOfArray[i] != "PLACE") {
    //         if (restOfArray[i] === validMoveText) {
    //             movementValidityCheck();
    //         } else if (restOfArray[i] === validLeftText) {
    //             // console.log("I need to turn left", restOfArray[i]);
    //             turnLeft();
    //         } else if (restOfArray[i] === validRightText) {
    //             turnRight();
    //         } else if (restOfArray[i] === validReportText) {
    //             reportRobotPosition();
    //         } else {
    //             console.log("Something", restOfArray[i]);
    //         }
    //         // } else if (restOfArray[i] === "PLACE") {
    //         //     // check to see if it is a valid PLACE STATEMENT
    //         //     var cc = restOfArray.slice([i]);
    //         //     console.log("CC is", cc);
    //         // }
    //     }
    // }
}

// } else if (restOfArray[i] === validPlaceText) {
//     var cc = restOfArray.slice([i]);
//     console.log("CC is", cc);
//     // console.log(
//     //     restOfArray[i],
//     //     restOfArray[i + 1],
//     //     restOfArray[i + 2],
//     //     restOfArray[i + 3]
//     // );

//     var gj =
//         restOfArray[i] +
//         " " +
//         restOfArray[i + 1] +
//         " " +
//         restOfArray[i + 2] +
//         " " +
//         restOfArray[i + 3];
//     console.log(gj);
//     var bx = formatInputtedCommand(gj);
//     console.log(bx);

//     var isTrue = commandStructureValidityCheck(bx);

//     console.log("is it true", isTrue);
// }

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
