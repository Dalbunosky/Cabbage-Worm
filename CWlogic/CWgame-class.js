import {drawBoard, hitWall} from './CWboard.js';
import { surveyEmptySpaces, bornWorm, moveWorm, drawWorm, hitSelf} from './CWworm.js';
import { drawFood, setFood } from './CWfood.js';
import {} from './CWpoop.js';

// classes board, cabbage worm, tile, food
// Build game:

// export default class Game{
export default class Game{
    // Initialize variables
    constructor(width, height, tile) {
        this.height = height;
        this.width = width;
        this.tile = tile;

        this.lastRender = 0;
        this.score = 0;
        this.speed = 1000;
        this.active = true; // Might eliminate later

        // Direction
        this.direction;
        this.worm = [];
        this.emptySpaces = new Set();
        this.food;
        this.foodImg = new Image();
        this.foodImg.src = "./img/food.png";
        this.game;

        this.cvs = document.getElementById("cabbage-worm");
        this.ctx = this.cvs.getContext("2d");
        document.addEventListener("keydown", changeDirection);
        this.startGame();
    }

    // Set worm head, use emptySpaces to keep track of empty spaces
    startGame(){
        surveyEmptySpaces();
        bornWorm();
        ///// Food
        this.food = setFood();

        this.draw();
    }

// Main, used for work requestAnimationFrame with turn
    main(currentTime){
        ///// NA
        const timeSinceRender = currentTime - this.lastRender;
        window.requestAnimationFrame(this.main);
        if(timeSinceRender < this.speed) return;
        ///// NA
        this.turn();
        this.lastRender = currentTime;
    }

// Turn
    turn(){
        moveWorm();
        ///// Worm.
        if(this.gameOver()){
            this.endGame();
            return;
        }
    ///// NA
    // Draw
        this.draw();
    }

// FUNCTIONS:
// Draw function
    draw(){
    ///// Grid
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;
        const tile = this.tile;
        const worm = this.worm;

    ///// Grid
    // Draw canvas
        drawBoard();
    ///// Worm
    // Draw worm
        drawWorm(ctx);
    ///// Food
    // Draw food
        drawFood(ctx);
    }

    ///// NA
// Update score
    scoreUpdate() {
        this.score ++;
        document.getElementById('score').innerText = '' + this.score;
        // if(this.score % 5 === 0) 
        this.speed *= 0.95;
    };

    ///// NA
// Game over?
    gameOver(){
        let wormX = this.worm[0].x;
        let wormY = this.worm[0].y;
        return(hitWall() || hitSelf());
    }
    ///// NA
    endGame(){
        this.active = false;
        let highScore = parseInt(document.getElementById('highScore').innerText);
        if(this.score > highScore) document.getElementById('highScore').innerText = '' + this.score;
        this.score = 0;
    }









/////////////////////////////
// BOARD
    // drawBoard(){
    //     ctx.fillStyle = "#FF0000";
    //     ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
    //     ctx.fillStyle = "saddlebrown";
    //     ctx.fillRect(tile, tile, width * tile, height * tile);
    // }
    // hitWall(){
    //     // check for worm head collision with wall
    //     if((wormX < 0) || (wormX > this.width - 1) || (wormY < 0) || (wormY > this.height - 1)) return true;
    // }

/////////////////////////////
// WORM
    // surveyEmptySpaces(){
    //     for(let i = 0; i < this.width * this.height; i++){
    //         this.emptySpaces.add(i);
    //     }
    // }
    // bornWorm(){
    //     this.worm[0] = {
    //         x: Math.floor(Math.random()*this.width),
    //         y: Math.floor(Math.random()*this.height)
    //     }
    //     this.emptySpaces.delete(this.worm[0].x * this.height + this.worm[0].y);
    // }
    // wormDirection(){
    //     let nextBox = [0,0, false];
    //     if( this.direction === "LEFT") nextBox = [-1, 0, true];
    //     else if( this.direction === "UP") nextBox = [0, -1, true];
    //     else if( this.direction === "RIGHT") nextBox = [1, 0, true];
    //     else if( this.direction === "DOWN") nextBox = [0, 1, true];
    //     return nextBox;
    // }
    // moveWorm(){
    // // Determine new head
    //     let nextBox = wormDirection();
    //     let wormX = this.worm[0].x + nextBox[0];
    //     let wormY = this.worm[0].y + nextBox[1];
    // // Advance
    //     // unshift new head
    //     // Remove head from emptySpaces
    //     worm.unshift({
    //         x: wormX,
    //         y: wormY
    //     });
    //     ///// Worm
    //     if(nextBox[2]) emptySpaces.delete(wormX * height + wormY);
    // // Eat food?
    //     if(wormX === food.x && wormY === food.y){
    //     // update score
    //     // Reassign food
    //         scoreUpdate();
    //         food = setFood();
    //     }
    //     else{
    //     // Pop tail
    //     // Add tail to emptySpaces
    //     const poop = worm.pop();
    //     emptySpaces.add(poop.x * height + poop.y)
    //     }
    // }
    // drawWorm(){
    //     for(let i =0; i < worm.length; i++){
    //         ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
    //         ctx.fillRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);

    //         ctx.strokeStyle = "yellow";
    //         ctx.strokeRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);
    //     }
    // }
    // changeDirection(event){
    //     if(event.keyCode === 37 && this.direction != "RIGHT"){
    //         this.direction = "LEFT";
    //     }
    //     else if(event.keyCode === 38 && this.direction != "DOWN"){
    //         this.direction = "UP";
    //     }
    //     else if(event.keyCode === 39 && this.direction != "LEFT"){
    //         this.direction = "RIGHT";
    //     }
    //     else if(event.keyCode === 40 && this.direction != "UP"){
    //         this.direction = "DOWN";
    //     }
    //     if(this.active) turn();
    // }
    // hitSelf(){
    //     // check for worm head collision with self
    //         // Worm can't hit self if length < 5
    //         if(this.worm.length < 5) return false;
    //     // If head location is not in emptySpaces Set, worm has crashed into self
    //         if(!emptySpaces.has(wormX * this.height + wormY)){
    //             return true
    //         };
    // }


/////////////////////////////
// POOP


/////////////////////////////
// FOOD
    // drawFood(){
    //     ctx.drawImage(this.foodImg, tile + tile * this.food.x, tile + tile * this.food.y, tile, tile);
    // }

    // setFood(){
    //     let openSpots = [...this.emptySpaces];
    //     let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)];
    //     // return [Math.floor(newFoodLocation / width), newFoodLocation % width]
    //     return {
    //         x: Math.floor(newFoodLocation / this.height),
    //         y: newFoodLocation % this.height
    //     }
    // }






}