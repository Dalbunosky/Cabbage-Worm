import {height, width, tile} from '../buildCWGame.js';
import {scoreUpdate} from './CWgame.js';
import {food, setFood} from './CWfood.js';

document.addEventListener("keydown", changeDirection);
export let worm = [];
let direction;
export const emptySpaces = new Set();

export function changeDirection(event){
    if(event.keyCode === 37 && direction != "RIGHT"){
        direction = "LEFT";
    }
    else if(event.keyCode === 38 && direction != "DOWN"){
        direction = "UP";
    }
    else if(event.keyCode === 39 && direction != "LEFT"){
        direction = "RIGHT";
    }
    else if(event.keyCode === 40 && direction != "UP"){
        direction = "DOWN";
    }
}

export function wormDirection(){
    let nextBox = [0,0, false];
    if( direction === "LEFT") nextBox = [-1, 0, true];
    else if( direction === "UP") nextBox = [0, -1, true];
    else if( direction === "RIGHT") nextBox = [1, 0, true];
    else if( direction === "DOWN") nextBox = [0, 1, true];
    return nextBox;
}

export function moveWorm(){
// Determine new head
    let nextBox = wormDirection();
    let wormX = worm[0].x + nextBox[0];
    let wormY = worm[0].y + nextBox[1];
// Advance
    // unshift new head
    // Remove head from emptySpaces
    worm.unshift({
        x: wormX,
        y: wormY
    });
    ///// Worm
    if(nextBox[2]) emptySpaces.delete(wormX * height + wormY);
// Eat food?
    if(wormX === food.x && wormY === food.y){
    // update score
    // Reassign food
        scoreUpdate();
        setFood();
    }
    else{
    // Pop tail
    // Add tail to emptySpaces
    const poop = worm.pop();
    emptySpaces.add(poop.x * height + poop.y)
    }
}

export function surveyEmptySpaces(){
    for(let i = 0; i < width * height; i++){
        emptySpaces.add(i);
    }
}
export function bornWorm(){
    direction = null;
    worm = [];
    worm[0] = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)
    }
    emptySpaces.delete(worm[0].x * height + worm[0].y);
}
export function drawWorm(ctx){
    for(let i =0; i < worm.length; i++){
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);
    }
}

export function hitSelf(){
// check for worm head collision with self
    // Worm can't hit self if length < 5
    if(worm.length < 5) return false;
// If head location is not in emptySpaces Set, worm has crashed into self
    if((emptySpaces.size + worm.length) > (width*height)){
    // if(!emptySpaces.has(worm[0].x * height + worm[0].y)){
        showHitSelf();
        console.log("SELF")
        return true
    };
    return false
}

export function drawWormHead(ctx){
    ctx.fillStyle = "green";
    ctx.fillRect(tile + tile * worm[0].x, tile + tile * worm[0].y, tile, tile);
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(tile + tile * worm[0].x, tile + tile * worm[0].y, tile, tile);
}

export function showEmptySpace(){
    console.log(emptySpaces.size + worm.length);
    console.log([...emptySpaces].sort());
}

function showHitSelf(){
    const overText = document.createElement('span');
    const att = document.createAttribute("id");
    att.value = "gameOver";
    overText.setAttributeNode(att);
    overText.innerText = "You've hit yourself!"
    gameboard.appendChild(overText);
}