import {drawBoard, hitWall} from './CWboard.js';
import {surveyEmptySpaces, bornWorm, moveWorm, drawWorm, hitSelf, drawWormHead, showEmptySpace} from './CWworm.js';
import { drawFood, setFood } from './CWfood.js';
import {} from './CWpoop.js';
import {height, width, tile} from '../buildCWGame.js';

// classes board, cabbage worm, tile, food
// Build game:

// export default class Game{
    // Initialize variables
// export let height, width, tile;
// document.addEventListener("keydown", turn);
document.getElementById("restart").addEventListener("click", resetGame);

let lastRender = 0, score = 0, speed = 500, startTime = 0;

let cvs;
let ctx;

    // Set worm head, use emptySpaces to keep track of empty spaces
export function startGame(){
    cvs = document.getElementById("cabbage-worm");
    ctx = cvs.getContext("2d");
    surveyEmptySpaces();
    bornWorm();
    setFood();
    draw();
}

function resetGame(){
    window.cancelAnimationFrame(main);
    document.getElementById('gameOver').remove();
    score = 0;
    speed = 500;
    lastRender = 0;
    document.getElementById('score').innerText = '' + score;
    startGame();
    startTime = window.requestAnimationFrame(main);
    
}

// Main, used for work requestAnimationFrame with turn
export function main(currentTime){
    ///// NA
    // document.getElementById('time').innerText = Math.floor((currentTime)/100 - startTime/5)/10;
    const timeSinceRender = currentTime - lastRender;
    if(gameOver()){
        endGame();
        cancelAnimationFrame(main);
        return;
    }
    window.requestAnimationFrame(main);
    if(timeSinceRender < speed) return;
    ///// NA
    turn();
    lastRender = currentTime;
}

// Turn
export function turn(){
    moveWorm();
    ///// Worm.
    // if(gameOver()){
    //     endGame();
    //     return;
    // }
///// NA
// Draw
    draw();
    // diagnosis();
}

// FUNCTIONS:
// Draw function
function draw(){
///// Grid
// Draw canvas
    drawBoard(ctx);
///// Worm
// Draw worm
    drawWorm(ctx);
///// Food
// Draw food
    drawFood(ctx);
}

    ///// NA
// Update score
export function scoreUpdate() {
    score ++;
    document.getElementById('score').innerText = '' + score;
    // if(score % 5 === 0) 
    speed *= 0.9;
};

// Game over?
function gameOver(){
    return(hitWall() || hitSelf());
}
    ///// NA
function endGame(){
    drawWormHead(ctx);
    let highScore = parseInt(document.getElementById('highScore').innerText);
    if(score > highScore) document.getElementById('highScore').innerText = '' + score;
    score = 0;
}

function diagnosis(){
    showEmptySpace();    

    for(let i = 0; i < width; i++){
        for(let j = 0; j < height; j++){
            ctx.font = "20px Comic Sans MS";
            ctx.fillStyle = "blue";
            // ctx.textAlign = "center";
            let tileNumber = i * height + j;
            ctx.strokeRect(tile + tile * i, tile + tile * j, tile, tile);
            ctx.fillText( tileNumber, tile + 12 + tile * i, tile + 30 + tile * j);

        }
    }
}