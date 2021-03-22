// classes board, cabbage worm, tile, food
// Build game:
    // Initialize variables
        // Height and width will change to depend on user input in the future.
        // Tile: tile width/height
        let height = 10, width = 10, tile = 50, maxGameHeight = window.height - 210 , maxGameWidth = window.length - 20;

        // Score, highScore keep track of scores
        // Speed: Interval between draws, determines speed of game
        // Active: Is game going on? Prevent height and width from changing mid-game
        // Direction
        let score = 0, highScore = 0, defaultSpeed = 1000000000, active = true, direction;
        let speed = defaultSpeed;
    // Grab element from HTML
        const cvs = document.getElementById("cabbage-worm");
        const ctx = cvs.getContext("2d");
        document.addEventListener("keydown", changeDirection);

    // Set worm head, use emptySpaces to keep track of empty spaces
        let worm = [];
        const emptySpaces = new Set();
        for(let i = 0; i < width * height; i++){
            emptySpaces.add(i);
        }

        worm[0] = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height)
        }
        // Can't remove from emptySpaces until check has been done, or game will crash
        // emptySpaces.delete(worm[0].x * width + worm[0].y);
    // Set food
        const foodImg = new Image();
        foodImg.src = "img/food.png";
        // let foodLocation = 
        let food = setFood();

// Run game
    // Turn every SPEED
    draw();
    let game = setInterval(turn, speed);

// Game over
    // clearInterval, Active = false

// Changing direction
    // listener
    // change direction
    // if active, draw

// Turn
    function turn(){
    // Determine new head
        let wormX = worm[0].x;
        let wormY = worm[0].y;
        if(direction){
            if( direction === "LEFT") wormX -= 1;
            else if( direction === "UP") wormY -= 1;
            else if( direction === "RIGHT") wormX += 1;
            else if( direction === "DOWN") wormY += 1;
    // Check if new position will end game
        if(gameOver(wormX, wormY)){
        // End Game, TBD, DONT DRAW
        // Active = false
            clearInterval(game);
            active = false;
        // Reassign high score
        // Reset score
            if(score > highScore) highScore = score;
            document.getElementById('highScore').innerText = '' + highScore;
            score = 0;
        }
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
        draw();
/*
        console.log("WORM", worm[0].x, worm[0].y, worm[0].x*height + worm[0].y);
        console.log("FOOD", food.x, food.y, food.x*height + food.y)
*/
    }

// FUNCTIONS:

// Draw function
    function draw(){
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
        ctx.drawImage(foodImg, tile + tile * food.x, tile + tile * food.y, tile, tile);
    }

// Food assignment
    function setFood(){
        let openSpots = [...emptySpaces];
        let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)];
        // return [Math.floor(newFoodLocation / width), newFoodLocation % width]
        return {
            x: Math.floor(newFoodLocation / height),
            y: newFoodLocation % height
        }
    }

// Change direction
    document.addEventListener("keydown", changeDirection);
    function changeDirection(event){
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
        if(active) turn();
    }

// Update score
    function scoreUpdate() {
        score ++;
        document.getElementById('score').innerText = '' + score;
        // if(score % 5 === 0) speed *= 0.95;
    };

// Game over?
    function gameOver(x, y){
    // check for worm head collision with wall
        if((x < 0) || (x > width - 1) || (y < 0) || (y > height - 1)) return true;
    // check for worm head collision with self
        // Worm can't hit self if length < 5
        if(worm.length < 5) return false;
    // If head location is not in emptySpaces Set, worm has crashed into self
        if(!emptySpaces.has(x * height + y)){
            return true
        };
    // Game not over.
        return false;
    }
    
