//movement of map, not character.
let left;
let right;
let up;
let down;

let state = 'down';

let rightTO;
let right2TO;
let leftTO;
let left2TO;
let downTO;
let down2TO;
let upTO;
let up2TO;

let x = 0;
let y = 0;

let xMinusTO;
let yMinusTO;
let yPlusTO;
let xPlusTO;

let PaulaTO;

let score = 0;
let boxStatus = 'closed';

let textBox;
let i = 1;

let randomTop;
let randomLeft;

let gameHasBegun = false;

var music = new Audio('KatiesWaltz.mp3');
var wind = new Audio('wind.mp3');
var whistle = new Audio('whistle.mp3');

let disableMovement = false;
let time = 61;

let timerTO;
let timer2TO;

let noTimer = true;
let gameOver = false;

let typerIndex = 0;
let talkingToTessie = false;

let documents;

let tessieMessage;
let response;

let highScore;

function typer(string, id) {
    let array = string.split(" ")
    length = array.length
    if (typerIndex <= length - 1) {
        document.getElementById(id).innerHTML += array[typerIndex] + ' '
        typerIndex++
        setTimeout(function () {
            typer(string, id);
        }, 50)
    } else {
        typerIndex = 0
    }
}

function walk(event) {
    window.removeEventListener('keydown', walk);
    // console.log(event.keyCode)
    if (event.keyCode === 39 && !disableMovement) {
        right1();
        moveMapLeft()
        state = 'right';
        if (!gameHasBegun) {
            wind.play();
        }

    } if (event.keyCode === 37 && !disableMovement) {
        left1();
        moveMapRight();
        state = 'left';

    } if (event.keyCode === 38 && !disableMovement) {
        up1();
        moveMapDown();
        state = 'up';

    } if (event.keyCode === 40 && !disableMovement) {
        down1();
        moveMapUp();
        state = 'down';

    } if (event.keyCode === 13) {
        document.getElementById('instructions').style.display = 'none'
        talkToPaula();
        talkToTessie();
    } if (event.keyCode === 81 && boxStatus === 'open') {
        stopTalkingToTessie();
    } if (event.keyCode === 16 && boxStatus === 'open' && !gameOver && !talkingToTessie) {
        endConvo();
    } if (event.keyCode === 81 && boxStatus === 'open' && score > 0) {
        enterScore();
        gameOver = true;
    }

}

function clearMovementTimeouts() {
    clearTimeout(rightTO);
    clearTimeout(right2TO);
    clearTimeout(leftTO);
    clearTimeout(left2TO);
    clearTimeout(downTO);
    clearTimeout(down2TO);
    clearTimeout(upTO);
    clearTimeout(up2TO);

    clearTimeout(yMinusTO);
    clearTimeout(xMinusTO);
    clearTimeout(yPlusTO);
    clearTimeout(xPlusTO);
}
function stopWalking(event) {

    clearMovementTimeouts();
    if (event.keyCode === 39) {
        left = false;
    } else if (event.keyCode === 37) {
        right = false;
    } else if (event.keyCode === 38) {
        down = false;
    } else if (event.keycode === 40) {
        up = false;
    }


    window.addEventListener('keydown', walk);


    if (state === 'up') {
        document.getElementById('image').style.backgroundPosition = "-3px -67px";

    } if (state === 'right') {
        document.getElementById('image').style.backgroundPosition = "-86px 0px";

    } if (state === 'down') {
        document.getElementById('image').style.backgroundPosition = "-3px 0px";

    } if (state === 'left') {
        document.getElementById('image').style.backgroundPosition = "-86px -67px";
    }

}

function right1() {
    document.getElementById('image').style.backgroundPosition = "-89px 0px";
    rightTO = setTimeout(right2, 180);
}
function right2() {
    document.getElementById('image').style.backgroundPosition = "-130px 0px";
    right2TO = setTimeout(right1, 180);
}

function left1() {
    document.getElementById('image').style.backgroundPosition = "-89px -67px";
    leftTO = setTimeout(left2, 180)
}
function left2() {
    document.getElementById('image').style.backgroundPosition = "-130px -67px";
    left2TO = setTimeout(left1, 180)
}

function down1() {
    document.getElementById('image').style.backgroundPosition = "-3px 0px";
    downTO = setTimeout(down2, 180);
}
function down2() {
    document.getElementById('image').style.backgroundPosition = "-44px 0px";
    down2TO = setTimeout(down1, 180)
}

function up1() {
    document.getElementById('image').style.backgroundPosition = "-3px -67px";
    upTO = setTimeout(up2, 180);
}
function up2() {
    document.getElementById('image').style.backgroundPosition = "-44px -67px";
    up2TO = setTimeout(up1, 180)
}

//background movement


function moveMap() {
    document.getElementById('map').style = `left:${x}px; top:${y}px`;
}
function moveMapLeft() {
    left = true;
    moveMap();
    decreaseX();
}
function moveMapRight() {
    right = true;
    moveMap();
    increaseX();
}
function moveMapUp() {
    up = true;
    moveMap()
    decreaseY();
}
function moveMapDown() {
    down = true;
    moveMap();
    increaseY();
}

function decreaseX() {
    if (!gameHasBegun) {
        x = x - 1
        if (left) {
            xMinusTO = setTimeout(moveMapLeft, 10)
        }
    } else {
        x = x - 4;
        if (left) {
            xMinusTO = setTimeout(moveMapLeft, 5)
        }
    }
}
function decreaseY() {
    if (!gameHasBegun) {
        y = y - 1
        if (up) {
            yMinusTO = setTimeout(moveMapUp, 10)
        }
    } else {
        y = y - 4;
        if (up) {
            yMinusTO = setTimeout(moveMapUp, 5)
        }
    }
}
function increaseY() {
    if (!gameHasBegun) {
        y = y + 1
        if (down) {
            yPlusTO = setTimeout(moveMapDown, 10)
        }
    } else {
        y = y + 4;
        if (down) {
            yPlusTO = setTimeout(moveMapDown, 5)
        }
    }
}
function increaseX() {
    if (!gameHasBegun) {
        x = x + 1
        if (right) {
            xPlusTO = setTimeout(moveMapRight, 10)
        }
    } else {
        x = x + 4;
        if (right) {
            xPlusTO = setTimeout(moveMapRight, 5)
        }
    }
}

window.addEventListener('keydown', walk);

window.addEventListener('keyup', stopWalking);

//Paula

function animatePaula1() {
    document.getElementById('paula').style.backgroundPosition = "0px 0px";
    setTimeout(animatePaula2, 540)

}
function animatePaula2() {
    document.getElementById('paula').style.backgroundPosition = "-43px 0px";
    setTimeout(animatePaula1, 540)
}
function positionPaula() {
    if (gameHasBegun === false) {
        document.getElementById('paula').style.left = `${1300 + x}px`;
        document.getElementById('paula').style.top = `${500 + y}px`;
        paulaTO = setTimeout(positionPaula, 5)

    } else if (gameHasBegun === true) {
        document.getElementById('paula').style.left = `${randomLeft + x}px`;
        document.getElementById('paula').style.top = `${randomTop + y}px`;
        paulaTO = setTimeout(positionPaula, 5)
    }
}
function positionTessie() {
    document.getElementById('tessie').style.left = `${1600 + x}px`;
    document.getElementById('tessie').style.top = `${400 + y}px`;
    setTimeout(positionTessie, 5)
}
function animateTessie1() {
    document.getElementById('tessie').style.backgroundPosition = "0px 0px";
    setTimeout(animateTessie2, 540)

}
function animateTessie2() {
    document.getElementById('tessie').style.backgroundPosition = "-227px 0px";
    setTimeout(animateTessie1, 540)
}
function talkToTessie() {
    if
    (document.getElementById('tessie').style.left.slice(0, -2) > 450
    &&
    document.getElementById('tessie').style.left.slice(0, -2) < 750
    &&
    document.getElementById('tessie').style.top.slice(0, -2) > 160
    &&
    document.getElementById('tessie').style.top.slice(0, -2) < 300
        &&
        boxStatus === 'closed') {

        console.log('talkToTessie')
        boxStatus = 'open'
        talkingToTessie = true

        textBox = document.createElement('p');
        textBox.setAttribute("id", "tessieBox")
        document.body.appendChild(textBox)
        typer(`Hi, ${tessieMessage}`, 'tessieBox')
    }
}
function stopTalkingToTessie() {
    console.log('stopTalkingToTessie')
    if (talkingToTessie) {
        textBox.remove()
        talkingToTessie = false;
        disableMovement = false;
        boxStatus = 'closed'
    }
}

function talkToPaula() {
    console.log('talkToPaula')
    if
    (document.getElementById('paula').style.left.slice(0, -2) > 600
    &&
    document.getElementById('paula').style.left.slice(0, -2) < 760
    &&
    document.getElementById('paula').style.top.slice(0, -2) > 320
    &&
    document.getElementById('paula').style.top.slice(0, -2) < 480
        &&
        boxStatus === 'closed') {
        disableMovement = true;
        if (gameHasBegun === false) {
            boxStatus = 'open'

            textBox = document.createElement('p');
            textBox.setAttribute("id", "welcome")
            document.body.appendChild(textBox)
            typer("Velkommen til Grønland! <br><br> Let's play Hide and Seek! I will give you 1 point each time you find me. Hee hee! <br><br> Press 'SHIFT' to play.", 'welcome')

        } else if (gameHasBegun === true) {

            score = score + 1;
            boxStatus = 'open';
            stopMusic();

            textBox = document.createElement('p');
            textBox.setAttribute("id", "foundMe");
            document.body.appendChild(textBox);
            typer(`Golly! You sure are good at Hide and Seek! <br><br> Your score is now ${score}. Good job, hee hee! <br><br> Press 'SHIFT' to play again, or 'Q' to quit and post your score to the leaderboard.`, 'foundMe')
            stopTimer();
        }
    }
}

function endConvo() {
    textBox.remove();
    boxStatus = 'closed'
    startGame();
}
function startGame() {
    disableMovement = false;
    clearTimeout(paulaTO);
    paulaRunsAway();
    playMusic();
    gameHasBegun = true;
    noTimer = false;
    timer();
}
function paulaRunsAway() {
    if (!randomTop) {
        document.getElementById('paula').style.top = `${500 + y + i}px`;
        //ADD LEFT TO THIS
        setTimeout(increaseI, 20);
    } else {
        document.getElementById('paula').style.top = `${randomTop + y + i}px`;
        //ADD LEFT TO THIS
        setTimeout(increaseI, 20);
    }
}
function increaseI() {
    clearTimeout(paulaTO);
    if (i < 1000) {
        i = i + 10
        paulaRunsAway();
    } else {
        i = 1;
        setTimeout(sheReappearsElsewhere, 100)
    }
}
function playMusic() {
    music.play()
    wind.pause()
}
function stopMusic() {
    music.pause()
    wind.play()
}
function sheReappearsElsewhere() {
    //topleft: (601,365) bottomleft: (601, -4340), bottomright: (-6469, -4340), topright: (-6469, 365)
    randomTop = Math.floor(Math.random() * (365 - 4340 + 1)) + 4340;
    randomLeft = Math.floor(Math.random() * (601 - 6469 + 1)) + 6469;
    document.getElementById('paula').style.top = randomTop + 'px';
    document.getElementById('paula').style.left = randomLeft + 'px';
    positionPaula()
    positionTessie()
}
function enterScore() {
    insertScore();
    insertDate();
    textBox.remove();
    document.getElementById('nameEntry').style.display = 'block';
    if (score < highScore) {
        typer(`Your score was ${score}. Nice! <br> <br> Please enter your name. <br> <br><br>`, 'nameEntryText')
        setTimeout(function () {
            document.getElementById('nameEntryText').innerHTML += '<input type="text" id="playerName" name="playerName"><input type="submit">'
        }, 1000)
    } else {
        document.getElementById('nameEntry').style.height = '50%'
        typer(`Your score was ${score}. Wow! That looks like the High Score! <br> <br> Please enter your name and message for the other players. <br><br>`, 'nameEntryText')
        setTimeout(function () {
            document.getElementById('nameEntryText').innerHTML += 'Name: <input type="text" id="playerName" name="playerName" value="name"><br>Message:<input type="text" name="message" value="message"><br><input type="submit">'
        }, 1250)
    }
}

function timer() {
    if (!noTimer) {
        var timerTO = setTimeout(updateTimer, 1000)
    }
}

function updateTimer() {
    document.getElementById('timerDisplay').style.display = 'block';
    if (time > 60) {
        document.getElementById('timerDisplayText').textContent = '60';
        time = time - 1;
        timer();
    } else {
        document.getElementById('timerDisplayText').textContent = time;
        if (time === 1) {
            whistle.play();
            timer();
            time = time - 1;
        } else if (time > 0) {
            time = time - 1;
            timer();
        } else {
            document.getElementById('timerDisplay').style.display = 'none';
            clearMovementTimeouts();
            disableMovement = true;
            time = 60;
            timeIsUp();
        }
    }
}
function stopTimer() {
    clearTimeout(timerTO);
    console.log('stopTimer!')
    document.getElementById('timerDisplay').style.display = 'none';
    time = 60;
    clearTimeout(timerTO);
    noTimer = true;
}
function timeIsUp() {
    gameOver = true;
    boxStatus = 'open';
    stopMusic();
    textBox = document.createElement('p');
    textBox.setAttribute('id', 'youLose');
    document.body.appendChild(textBox);

    if (score > 0) {
        typer(`Time is up! I'm a pretty good hider, right? <br> <br> Your score was ${score}. Good job, hee hee! <br> <br> Press 'Q' to quit and post your score to the leaderboard`, 'youLose');
        stopTimer();

    } else {
        typer(`Time is up! I'm a pretty good hider, right? <br> <br> Your score was ${score}. You couldn't even find me once? hee hee! <br> <br> Game Over. Refresh the page to try again.`, 'youLose');
        stopTimer();
    }
}
function insertScore() {
    document.getElementById('invisibleScore').value = score
}
function insertDate() {
    let date = new Date;
    let formattedDate = date.toLocaleDateString('en-US')
    document.getElementById('invisibleDate').value = formattedDate
}

function timeout() {
    setTimeout("fetchScores()", 4000)
}

function fetchScores() {
    fetch('/scores')
    .then(response => response.json())
    .then(displayTessieMessage);
}

function displayTessieMessage(scores) {
    tessieMessage = `I'm  ${cleanString(scores[0].playerName.toUpperCase())} <br><br> Think you can beat my HIGH SCORE of ${scores[0].playerScore} ? <br><br> ${cleanString(scores[0].message)} <br><br>(press 'Q' to exit)`;
    
    highScore = scores[0].playerScore;
}
function cleanString(string){
    return string.replace(/\+/gi,' ')
}

animatePaula1();
positionPaula();
positionTessie();
animateTessie1();
