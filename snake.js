// classes board, snake, tile, food
// Build game:
    // Grab element from HTML
        const cvs = document.getElementById("snake");
        const ctx = cvs.getContext("2d");
        document.addEventListener("keydown", changeDirection);
    // Initialize variables
        // Height and width will change to depend on user input in the future.
        // Tile: width of snake
        const height = 10, width = 10, tile = 50;
        // Score, highScore keep track of scores
        // Speed: Interval between draws, determines speed of game
        // Active: Is game going on? Prevent height and width from changing mid-game
        // Direction
        let score = 0, highScore = 0, defaultSpeed = 1000000000, active = true, direction;
        let speed = defaultSpeed;
    // Change tile to be window width / (user request + 2), so long tile > minimum

    // Set snake head, use emptySpaces to keep track of empty spaces
        let snake = [];
        const emptySpaces = new Set();
        for(let i = 0; i < width * height; i++){
            emptySpaces.add(i * tile);
        }

        snake[0] = {
            x: Math.floor(Math.random()*width+1) * tile,
            y: Math.floor(Math.random()*height+1) * tile
        }
        // Can't remove from emptySpaces until check has been done, or game will crash
        // emptySpaces.delete(snake[0].x * width + snake[0].y);
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
    // Draw
        draw();
    // Game Over?
        if(gameOver()){
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
        // Determine new head
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        // old head + direction
        // unshift new head
        // Remove head from emptySpaces
        if(direction){
            if( direction === "LEFT") snakeX -= tile;
            else if( direction === "UP") snakeY -= tile;
            else if( direction === "RIGHT") snakeX += tile;
            else if( direction === "DOWN") snakeY += tile;
            snake.unshift({
                x: snakeX,
                y: snakeY
            });
            emptySpaces.delete((snakeX / tile) * width + (snakeY / tile))
        // Eat food?
            if(snakeX === food.x && snakeY === food.y){
            // update score
                scoreUpdate();
            // Reassign food
                food = setFood();
            }
            else{
            // Pop tail
            const poop = snake.pop();
            // Add tail to emptySpaces
            emptySpaces.add(poop.x * width + poop.y)
            }        
        }


    }


// FUNCTIONS:

// Draw function
    function draw(){
    // Draw canvas
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
        ctx.fillStyle = "saddlebrown";
        ctx.fillRect(tile, tile, width * tile, height * tile);
    // Draw snake
        for(let i =0; i < snake.length; i++){
            ctx.fillStyle = (i === 0) ? "orange" : "yellow";
            ctx.fillRect(snake[i].x, snake[i].y, tile, tile);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].j, snake[i].x + tile, snake[i].j + tile);
        }
    // Draw food
        ctx.drawImage(foodImg, food.x, food.y, tile, tile);
    }

// Food assignment
    function setFood(){
        let openSpots = [...emptySpaces];
        let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)] / tile;
        // return [Math.floor(newFoodLocation / width), newFoodLocation % width]
        return {
            x: tile * (1 + Math.floor(newFoodLocation / width)),
            y: tile * (1 + newFoodLocation % width)
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
        turn();
    }

// Update score
    function scoreUpdate() {
        score ++;
        document.getElementById('score').innerText = '' + score;
        // if(score % 5 === 0) speed *= 0.95;
    };

// Game over?
    function gameOver(){
        const head = snake[0];
    // check for snake head collision with wall
        if(head.x < tile || head.x > (width * tile + tile) || head.y < tile || head.y > (height * tile + tile)) return true;
    // check for snake head collision with self
        // Snake can't hit self if length < 5
        if(snake.length < 5) return false;
    // If head location is not in emptySpaces Set, snake has crashed into self
        if(!emptySpaces.has((head.x / tile) * width + (head.y / tile))) return true

    // Game not over. Delete new head location from Set
        emptySpaces.delete((head.x / tile) * width + (head.y / tile))
        return false;
    }
    
