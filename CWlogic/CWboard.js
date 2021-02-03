import {height, width, tile} from '../buildCWGame.js';
import {worm} from './CWworm.js';

export function drawBoard(ctx){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(tile, tile, width * tile, height * tile);
}
export function hitWall(){
    // check for worm head collision with wall
    let wormX = worm[0].x;
    let wormY = worm[0].y;
    if((wormX < 0) || (wormX > width - 1) || (wormY < 0) || (wormY > height - 1)){ 
        console.log("WALL");
        return true
    };
    return false;
}

export function showTile(){
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