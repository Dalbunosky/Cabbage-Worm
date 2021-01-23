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
        this.game;

        this.cvs = document.getElementById("cabbage-worm");
        this.ctx = this.cvs.getContext("2d");
        document.addEventListener("keydown", this.changeDirection);
        console.log("SUCCESS");
        this.startGame();
    }

    // Set worm head, use emptySpaces to keep track of empty spaces
    startGame(){
        for(let i = 0; i < this.width * this.height; i++){
            this.emptySpaces.add(i);
        }

        this.worm[0] = {
            x: Math.floor(Math.random()*this.width),
            y: Math.floor(Math.random()*this.height)
        }
        this.emptySpaces.delete(this.worm[0].x * this.height + this.worm[0].y);

        this.foodImg.src = "./img/food.png";
        this.food = this.setFood();
    // Run game
        // Turn every SPEED
        this.draw();
        // this.game = setInterval(this.turn, this.speed);
        window.requestAnimationFrame(this.main);
        
        // while(!this.gameOver()){
        //     setTimeout( 
        //         function(){
        //             console.log("RUNNING");
        //         }, 50
        //     );
        // } 
        //GAME OVER

        clearInterval(this.game);
        this.active = false;
        let highScore = parseInt(document.getElementById('highScore').innerText);
        if(this.score > highScore) document.getElementById('highScore').innerText = '' + this.score;
        this.score = 0;
    }

// Main, used for work requestAnimationFrame with turn
    main(currentTime){
        const timeSinceRender = currentTime - this.lastRender;
        console.log(currentTime);
        if(timeSinceRender < this.speed) return;
        window.requestAnimationFrame(this.main);
        this.turn();
        console.log(this.lastRender);
        this.lastRender = currentTime;
        // setTimeout(this.turn(), this.speed);
        // if(!this.gameOver()){
        //     window.requestAnimationFrame(this.step());
        // }
    }

// Turn
    turn(){
    // Determine new head
        let wormX = this.worm[0].x;
        let wormY = this.worm[0].y;
        if(this.direction){
            if( this.direction === "LEFT") wormX -= 1;
            else if( this.direction === "UP") wormY -= 1;
            else if( this.direction === "RIGHT") wormX += 1;
            else if( this.direction === "DOWN") wormY += 1;
    // Check if new position will end game
                            // if(gameOver()){
                            // // End Game, TBD, DONT DRAW
                            // // Active = false
                            //     clearInterval(game);
                            //     this.active = false;
                            // // Reassign high score
                            // // Reset score
                            //     if(score > highScore) highScore = score;
                            //     document.getElementById('highScore').innerText = '' + highScore;
                            //     score = 0;
                            // }
    // Advance
        // unshift new head
        // Remove head from emptySpaces
        worm.unshift({
            x: wormX,
            y: wormY
        });
        emptySpaces.delete(wormX * height + wormY)
        // Eat food?
            if(wormX === food.x && wormY === food.y){
            // update score
            // Reassign food
                scoreUpdate();
                food = setFood();
            }
            else{
            // Pop tail
            // Add tail to emptySpaces
            const poop = worm.pop();
            emptySpaces.add(poop.x * height + poop.y)
            }        
        }
    // Draw
        this.draw();
    }

// FUNCTIONS:

// Draw function
    draw(){
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;
    const tile = this.tile;
    const worm = this.worm;

    // Draw canvas
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
        ctx.fillStyle = "saddlebrown";
        ctx.fillRect(tile, tile, width * tile, height * tile);

/*        
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

        console.log([...emptySpaces].sort());
*/
    // Draw worm
        for(let i =0; i < worm.length; i++){
            ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
            ctx.fillRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);

            ctx.strokeStyle = "yellow";
            ctx.strokeRect(tile + tile * worm[i].x, tile + tile * worm[i].y, tile, tile);
        }
    // Draw food
        ctx.drawImage(this.foodImg, tile + tile * this.food.x, tile + tile * this.food.y, tile, tile);
    }

// Food assignment
    setFood(){
        let openSpots = [...this.emptySpaces];
        let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)];
        // return [Math.floor(newFoodLocation / width), newFoodLocation % width]
        return {
            x: Math.floor(newFoodLocation / this.height),
            y: newFoodLocation % this.height
        }
    }

// Change direction
    changeDirection(event){
        if(event.keyCode === 37 && this.direction != "RIGHT"){
            this.direction = "LEFT";
        }
        else if(event.keyCode === 38 && this.direction != "DOWN"){
            this.direction = "UP";
        }
        else if(event.keyCode === 39 && this.direction != "LEFT"){
            this.direction = "RIGHT";
        }
        else if(event.keyCode === 40 && this.direction != "UP"){
            this.direction = "DOWN";
        }
        if(this.active) turn();
    }

// Update score
    scoreUpdate() {
        this.score ++;
        document.getElementById('score').innerText = '' + this.score;
        // if(this.score % 5 === 0) 
        this.speed *= 0.95;
    };

// Game over?
    gameOver(){
        let wormX = this.worm[0].x;
        let wormY = this.worm[0].y;
    // check for worm head collision with wall
        if((wormX < 0) || (wormX > this.width - 1) || (wormY < 0) || (wormY > this.height - 1)) return true;
    // check for worm head collision with self
        // Worm can't hit self if length < 5
        if(this.worm.length < 5) return false;
    // If head location is not in emptySpaces Set, worm has crashed into self
        if(!emptySpaces.has(wormX * this.height + wormY)){
            return true
        };
    // Game not over.
        return false;
    }
}