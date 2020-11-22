// classes board, snake, tile, food
// Build game:
    // Grab element from HTML
    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");
    // Initialize variables
    let score = 0;
    let highScore = 0;
    let speed = 1000; // Interval between draws, determines speed of game

    // Height and width will change to depend on user input in the future.
    // Change to be window width / (user request + 2), so long tile > minimum
    const height = 10;
    const width = 10;
    const tile = 50;

    // Set snake head, use emptySpaces to keep track of empty spaces
    let snake = [];
    const emptySpaces = new Set();
    for(let i = 0; i < width * height; i++){
        emptySpaces.add(i*j);
    }

    snake[0] = {
        x: Math.floor(Math.random()*width+1) * tile,
        y: Math.floor(Math.random()*height+1) * tile
    }
    emptySpaces.delete(snake[0].x * snake[0].y);

    // Set food
    const foodImg = new Image();
    foodImg.src = "img/food.png";
    let foodLocation = setFood();
    let food = {
        x: foodLocation[0] * tile,
        y: foodLocation[1] * tile
    }

    // Run game
    draw();
    let game 
    // game = setInterval(draw, speed);  // Game won't be using this until otherwise fully functioning
    game = document.addEventListener("keydown", direction);    // Until game is otherwise running, this is the only way to advance in game

// Run game
    // Turn based
    // Draw snake
    draw();
    // Game Over?;
    if(gameOver()){
        // End Game, TBD, DONT DRAW
        game = null;
        // clearInterval(game);
        if(score > highScore) highScore = score;
        score = 0;
    }
    // Advance


    // Eat food?
        // DON'T POP
        // Reassign food
        // update score

// Food assignment
    function setFood(){
        let openSpots = [...emptySpaces];
        let newFoodLocation = openSpots[Math.floor(Math.random() * openSpots.length)];
        return [Math.floor(newFoodLocation / width), newFoodLocation % width]
    }

// Draw function
    function draw(){
    // Draw canvas
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0,(width + 2) * tile, (height + 2) * tile);
        ctx.fillStyle = "Lightgreen";
        ctx.fillRect(tile, tile, width * tile, height * tile);
    // Draw snake
        for(let i =0; i < snake.length; i++){
            ctx.fillStyle = (i === 0) ? "orange" : "yellow";
            ctx.fillRect(snake[i].x, snake[i].y, tile, tile);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].j, tile, tile)
        }
    // Draw food
        // Snake eat? setFood
        // Draw food
        ctx.drawImage(foodImg, food.x, food.y, tile, tile);

    // Move snake
        // old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // move
        if( d = "LEFT") snakeX -= tile;
        if( d = "UP") snakeY -= tile;
        if( d = "RIGHT") snakeX += tile;
        if( d = "DOWN") snakeY += tile;

    // If the snake eats food
        if(snakeX === food.x && snakeY === food.y){
        // Add and display new score
            score ++;
            scoreUpdate();
        // Assign new food
            let newFood = setFood();
            food = {
                x: newFood[0] * tile,
                y: newFood[1] * tile
            }
        } else {
        // remove tail, add to available Set
            let poop = snake.pop();
            emptySpaces.add(poop.x * width + poop.y)
        }
    // Append new head
        snake.unshift(
            {x: snakeX, y: snakeY}
        )
    }

// Change direction
document.addEventListener("keydown", direction);
    function direction(event){
        if(event.keyCode === 37 && d != "RIGHT"){
            d = "LEFT";
            draw();
        }
        else if(event.keyCode === 38 && d != "DOWN"){
            d = "UP";
            draw();
        }
        else if(event.keyCode === 39 && d != "LEFT"){
            d = "RIGHT";
            draw();
        }
        else if(event.keyCode === 40 && d != "UP"){
            d = "DOWN";
            draw();
        }
    }

    function gameOver(){
        const head = snake[0];
    // check for snake head collision with wall
        if(head.x < 1 || head.x > 11 || head.y < 1 || head.y > 11) return true;
    // check for snake head collision with self
        // Snake can't hit self if length < 5
        if(snake.length < 5) return false;
    // If head location is not in emptySpaces Set, snake has crashed into self
        if(!emptySpaces.has(head.x * width + head.y)) return true

    // Game not over. Delete new head location from Set
        emptySpaces.delete(head.x * width + head.y)
        return false;
    }

    function scoreUpdate() {
        document.getElementById('score').innerText = '' + score;
        // if(score % 5 === 0) speed *= 0.95;
    };

// classes board, snake, tile, food

// Build game:
    // Set snake head
    // Set food
    // EmptySpaces array, just in case
    // Run game
// Run game
    // Turn based
    // Draw snake
    // Game Over?
        // End Game, TBD, DONT DRAW
    // Eat food?
        // DON'T POP
        // Reassign food
        // update score

// Food assignment
    // If H*W *0.5 > snake length
        // Fully random assign
        // Repeat if food placed on snake
    // Else
        // Create emptySpaces, begin to track where snake isn't