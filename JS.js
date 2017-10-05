const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

var randomValue = Math.random() < 0.5 ? -1 : 1;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;
let ballSpeedX = -4;
let ballSpeedY = -4;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
let playerY = 200;

const aiX = 910;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

const topCanvas = canvas.offsetTop;

function GameStart() {
    ballSpeedX = randomValue * 4;
    ballSpeedY = randomValue * 4;
}

function ball () {
    ctx.fillStyle = 'white';  //paddel color
    ctx.fillRect( ballX, ballY, ballSize, ballSize);
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballY <= 0 || ballY >= ch - ballSize) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    
    if(ballX <= playerX + paddelWidth && ballY >= playerY - paddelHeight && ballY <= playerY + paddelHeight){
            ballSpeedX = -ballSpeedX;
    } else if(ballX + ballSize >= aiX && ballY >= aiY - paddelHeight && ballY <= aiY + paddelHeight) {
            ballSpeedX = -ballSpeedX
        }
    
    if(ballX <= 0 || ballX >= cw - ballSize) {
        
        ballX = cw/2 - ballSize/2;
        ballY = ch/2 - ballSize/2;
        ballSpeedX = 0;
        ballSpeedY = 0;
        setTimeout(GameStart, 3000);
    }
}


function table() {
    //table
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cw,ch);
    //Lines in the middle
    for(let linePosition = 20; linePosition < ch; linePosition += 30 ) {
        ctx.fillStyle = 'gray'
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight)
    }
}

function player() {
    ctx.fillStyle = 'blue';  //ball color
    ctx.fillRect( playerX, playerY, paddelWidth, paddelHeight);
}

function ai() {
    ctx.fillStyle = 'red';  //ball color
    ctx.fillRect( aiX, aiY, paddelWidth, paddelHeight); 
}



function playerPosition(e) {
    playerY = e.clientY - topCanvas - paddelHeight/2;
    
    if (playerY >= ch - paddelHeight) {
        playerY = ch - paddelHeight;
    } else if (playerY <= 0) {
        playerY = 0;
    }
}

function aiPosition() {
    const middlePaddel = aiY + paddelHeight/2;
    const middleBall = ballY + ballSize/2;
    
    if(ballX > 500) {
        if(middlePaddel - middleBall > 200) {
            aiY -= 20;  
        } else if(middlePaddel - middleBall > 50) {
            aiY -= 10;
        } else if(middlePaddel - middleBall < -200) {
            aiY += 20;
        } else if(middlePaddel - middleBall < -50) {
            aiY +=10;
        }
    } else if(ballX <= 500 && ballX > 150) {
        if(middlePaddel - middleBall > 100) {
            aiY -= 3; 
        } else if(middlePaddel - middleBall < -100){
            aiY += 3;
        }
    }
}

function speedUp() {
    //Speed X
    if(ballSpeedX > 0  && ballSpeedX < 15) {
        ballSpeedX += 0.4;
    } else if(ballSpeedX < 0 && ballSpeedX > -15) {
        ballSpeedX += -0.4;
    }
    
    //Speed Y
    if(ballSpeedY > 0 && ballSpeedY < 15) {
        ballSpeedY += 0.4;
    } else if(ballSpeedY < 0 && ballSpeedY > -15) {
        ballSpeedY += -0.4;
    }
}

canvas.addEventListener("mousemove", playerPosition)

function game() {
     table()
     ball()
     player()
     ai()
     aiPosition()
}


setInterval(game, 1000/60)