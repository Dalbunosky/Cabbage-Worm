import Game from "./game.js";
// const Game = require('./game.js');
// import "./game.js";

let elem = document.getElementById("start");
document.getElementById("start").addEventListener("click", setDimensions);

function setDimensions(){
// Record player's desired width and height
// Determine if too big (cause tile size to be < 20)
// Correct as needed, then pick bigger of 2 possible tile size, max at 50
    const requestHeight = parseInt(document.getElementById("height").value);
    const requestWidth = parseInt(document.getElementById("width").value);
    let totalHeight = 2 + parseInt(document.getElementById("height").value);
    let totalWidth = 2 + parseInt(document.getElementById("width").value);
    const boardHeight = document.getElementById("build-grid").offsetHeight;
    const boardWidth = document.getElementById("build-grid").offsetWidth;
    if(boardHeight / 20 < totalHeight) totalHeight = Math.floor(boardHeight / 20);
    if(boardHeight / 20 < totalWidth) totalWidth = Math.floor(boardWidth / 20);
    const tile = Math.min(Math.floor(Math.max(boardHeight/totalHeight, boardWidth/totalWidth)),50);

// Create new div to hold canvas
// Add attribute, content
// Grab element to be replaced
// Replace element
    const gameboard = document.createElement('div');
    const att = document.createAttribute("id");
    att.value = "gameboard";
    gameboard.setAttributeNode(att);

    // gameboard.innerHTML = `
    // <p>The desired width is ${requestWidth} and height ${requestHeight}.<br>
    // The window width is ${boardWidth} and height ${boardHeight}.<br>
    // The set width is ${totalWidth - 2} + 2 and height ${totalHeight - 2} + 2.<br>
    // Each tile will have a length of ${tile}pixels on each side.<br></p>`; 
    
    gameboard.innerHTML = `<canvas id="cabbage-worm" width="${boardWidth}" height=${boardHeight}></canvas>`;

    const buildGrid = document.getElementById("build-grid");
    buildGrid.parentNode.replaceChild(gameboard, buildGrid);
    let currCWGame = new Game(totalWidth, totalHeight, tile);
    window.requestAnimationFrame(currCWGame.main);


}

function main(currCWGame){
    let currentTime = Date.now();
    if(currCWGame.gameOver()){
        currCWGame.endGame();
        return;
    }
    const timeSinceRender = currentTime - currCWGame.lastRender;
    window.requestAnimationFrame(currCWGame.main);
    if(timeSinceRender < currCWGame.speed) return;
    currCWGame.turn();
    currCWGame.lastRender = currentTime;
}