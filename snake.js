// classes board, snake, tile, food
// Build game:
    // Grab element from HTML
        const cvs = document.getElementById("snake");
        const ctx = cvs.getContext("2d");
        document.addEventListener("keydown", changeDirection);
    // Initialize variables
        // Height and width will change to depend on user input in the future.
        // Tile: width of snake
        const height = 10, width = 5, tile = 50;
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
            emptySpaces.add(i);
        }

        snake[0] = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height)
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
    // Determine new head
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if(direction){
            if( direction === "LEFT") snakeX -= 1;
            else if( direction === "UP") snakeY -= 1;
            else if( direction === "RIGHT") snakeX += 1;
            else if( direction === "DOWN") snakeY += 1;
    // Check if new position will end game
        if(gameOver(snakeX, snakeY)){
            console.log("GAMEOVER, ", score);
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
        snake.unshift({
            x: snakeX,
            y: snakeY
        });
        emptySpaces.delete(snakeX * height + snakeY)
        // Eat food?
            if(snakeX === food.x && snakeY === food.y){
            // update score
            // Reassign food
                scoreUpdate();
                food = setFood();
            }
            else{
            // Pop tail
            // Add tail to emptySpaces
            const poop = snake.pop();
            emptySpaces.add(poop.x * height + poop.y)
            }        
        }
    // Draw
        draw();
        console.log("SNAKE", snake[0].x, snake[0].y, snake[0].x*height + snake[0].y);
        console.log("FOOD", food.x, food.y, food.x*height + food.y)
    }

// FUNCTIONS:

// Draw function
    function draw(){
    // Draw canvas
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
        ctx.fillStyle = "saddlebrown";
        ctx.fillRect(tile, tile, width * tile, height * tile);
        
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
    // Draw snake
        for(let i =0; i < snake.length; i++){
            ctx.fillStyle = (i === 0) ? "orange" : "yellow";
            ctx.fillRect(tile + tile * snake[i].x, tile + tile * snake[i].y, tile, tile);

            ctx.strokeStyle = "red";
            ctx.strokeRect(tile + tile * snake[i].x, tile + tile * snake[i].y, tile, tile);
        }
    // Draw food
        ctx.drawImage(foodImg, tile + tile * food.x, tile + tile * food.y, tile, tile);
    }

// Food assignment
    function setFood(){
        let openSpots = [...emptySpaces];
        let newFoodLocation = openSpots[Math.floor(Math.random() * (openSpots.length + 1))];
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
    // check for snake head collision with wall
        if((x < 0) || (x > width - 1) || (y < 0) || (y > height - 1)) return true;
    // check for snake head collision with self
        // Snake can't hit self if length < 5
        if(snake.length < 5) return false;
    // If head location is not in emptySpaces Set, snake has crashed into self
        if(!emptySpaces.has(x * height + y)){
            console.log("HIT");
            return true
        };
    // Game not over.
        return false;
    }
    
