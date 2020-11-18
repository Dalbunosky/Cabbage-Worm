const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";
// ground.alt = "Oops";
const foodImg = new Image();
foodImg.src = "img/food.png";

let score = 0;
let speed = 1000; // Interval between draws, determines speed of game

let game;

// document.addEventListener("keydown", pressSpace);
function pressSpace(event){
    if(event.keyCode === 32) draw();
}

game = setInterval(draw, speed);  // Needs to be modify to per press of space

///////////////////
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}   // Later to be random
///////////////////
let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

///////////////////
document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode === 37 && d != "RIGHT"){
        d = "LEFT";
    }
    else if(event.keyCode === 38 && d != "DOWN"){
        d = "UP";
    }
    else if(event.keyCode === 39 && d != "LEFT"){
        d = "RIGHT";
    }
    else if(event.keyCode === 40 && d != "UP"){
        d = "DOWN";
    }
    else if(event.keyCode === 32){
       draw();
    }
}

///////////////////
// Draw function, called at every turn
function draw(){
    // ctx.drawImage(ground, 0, 0);

    for(let i =0; i < snake.length; i++){
        ctx.fillStyle = (i === 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].j, box, box)
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    // move direction
    if( d = "LEFT") snakeX -= box;
    if( d = "UP") snakeY -= box;
    if( d = "RIGHT") snakeX += box;
    if( d = "DOWN") snakeY += box;

    // if the snake eats food
    if(snakeX === food.x && snakeY === food.y){
        score ++;
        ///////////////////////////////////////////////////CHANGE THIS
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
    } else {
    // remove tail
    snake.pop();
    }

// game over?
    // Snake hits wall
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 15 * box){
        clearInterval(game);
    }
    // Snake hits self
    // if()
    for(let i = 0; i < snake.length; i++){
        if(newHead.x === snake[i].x && newHead.y === snake[i].y) clearInterval(game);
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}




function gameOver(snake){
    const head = snake[0];
// check for snake head collision with wall
    if(head.x < 1 || head.x > 11 || head.y < 1 || head.y > 11) return true;
// check for snake head collision with self
    // Snake can't hit self if length < 5
    if(snake.length < 5) return false;
    for(let i = 4; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function scoreUpdate() {
    document.getElementById('score').innerText = '' + score;
    // if(score % 5 === 0) speed *= 0.9;
};

// classes board, snake, tile, food

// Build game:
    // Set snake head
    // Set food
    // Run game
// Run game
    // Turn based
    // Draw snake
    // Game Over?
        // End Game, TBD, DONT DRAW
    // Eat food?
        // DON'T POP
        // Eliminate old food, add new food
        // update score

// Food assignment
    // If H*W *0.5 > snake length
        // Fully random assign
        // Repeat if food placed on snake
    // Else
        // Create emptySpaces, begin to track where snake isn't