import {height, width, tile} from '../buildCWGame.js';
import {emptySpaces} from "./CWworm.js"
const foodImg = new Image();
foodImg.src = "./img/food.png";
export let food;

export function drawFood(ctx){
    ctx.drawImage(foodImg, tile + tile * food.x, tile + tile * food.y, tile, tile);
}

export function setFood(){
    let openSpots = [...emptySpaces];
    let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)];
    // return [Math.floor(newFoodLocation / width), newFoodLocation % width]
    food = {
        x: Math.floor(newFoodLocation / height),
        y: newFoodLocation % height
    }
    return food;
}