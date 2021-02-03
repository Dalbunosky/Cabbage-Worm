import Game from "./game.js";
import {startGame, main} from './CWlogic/CWgame.js';
// const Game = require('./game.js');
// import "./game.js";

let elem = document.getElementById("start");
document.getElementById("start").addEventListener("click", setDimensions);
let totalHeight, totalWidth;
export let height, width, tile;

function setDimensions(){
// Record player's desired width and height
// Determine if too big (cause tile size to be < 20)
// Correct as needed, then pick bigger of 2 possible tile size, max at 50
    const requestHeight = parseInt(document.getElementById("height").value);
    const requestWidth = parseInt(document.getElementById("width").value);
    totalHeight = 2 + parseInt(document.getElementById("height").value);
    totalWidth = 2 + parseInt(document.getElementById("width").value);
    let boardHeight = document.getElementById("build-grid").offsetHeight;
    let boardWidth = document.getElementById("build-grid").offsetWidth;
    if(boardHeight / 20 < totalHeight) totalHeight = Math.floor(boardHeight / 20);
    if(boardWidth / 20 < totalWidth) totalWidth = Math.floor(boardWidth / 20);
    console.log(boardHeight/totalHeight);
    console.log(boardWidth/totalWidth);
    console.log(Math.min(boardHeight/totalHeight, boardWidth/totalWidth));
    console.log(Math.floor(Math.min(boardHeight/totalHeight, boardWidth/totalWidth)));
    // tile = Math.min(Math.floor(Math.min(boardHeight/totalHeight, boardWidth/totalWidth)),50);
    tile = Math.min(Math.floor(boardHeight/totalHeight), Math.floor(boardWidth/totalWidth),50);
    height = totalHeight - 2;
    width = totalWidth - 2;
    boardHeight = totalHeight * tile;
    boardWidth = totalWidth * tile;

    console.log(`Desired width ${requestWidth}tiles` );
    console.log(`and height ${requestHeight}tiles`);
    console.log(`The window width is ${boardWidth}px`);
    console.log(`and height ${boardHeight}px`);
    console.log(`The set width is ${totalWidth - 2} + 2 `);
    console.log(`and height ${totalHeight - 2} + 2.`);
    console.log(`Each tile length of ${tile}px.`);

    // // gameboard.innerHTML = `
    // // <p>The desired width is ${requestWidth} and height ${requestHeight}.<br>
    // // The window width is ${boardWidth} and height ${boardHeight}.<br>
    // // The set width is ${totalWidth - 2} + 2 and height ${totalHeight - 2} + 2.<br>
    // // Each tile will have a length of ${tile}pixels on each side.<br></p>`; 

// Create new div to hold canvas
// Add attribute, content
// Grab element to be replaced
// Replace element
    
    const gameboard = document.createElement('div');
    const att = document.createAttribute("id");
    att.value = "gameboard";
    gameboard.setAttributeNode(att);

    const script_element = document.createElement('script');
    script_element.type = 'module';
    script_element.src = './CWlogic/CWgame.js';
    gameboard.appendChild(script_element);
    
    gameboard.innerHTML = `<canvas id="cabbage-worm" width="${boardWidth}px" height="${boardHeight}px"></canvas>`;
    const buildGrid = document.getElementById("build-grid");
    buildGrid.parentNode.replaceChild(gameboard, buildGrid);

    // let setBoard = document.getElementById("cabbage-worm");
    // setBoard.style.width = `${boardWidth}px`;
    // setBoard.style.width = `${boardWidth}px`;
    // setBoard.style.zIndex = 1;

    startGame();
    window.requestAnimationFrame(main);


    // let currCWGame = new Game(totalWidth, totalHeight, tile);
    // window.requestAnimationFrame(currCWGame.main);
}

// function main(currCWGame){
//     let currentTime = Date.now();
//     if(currCWGame.gameOver()){
//         currCWGame.endGame();
//         return;
//     }
//     const timeSinceRender = currentTime - currCWGame.lastRender;
//     window.requestAnimationFrame(currCWGame.main);
//     if(timeSinceRender < currCWGame.speed) return;
//     currCWGame.turn();
//     currCWGame.lastRender = currentTime;
// }