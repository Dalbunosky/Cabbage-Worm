# Cabbage Worm

This game is a rendition on the classic Snake game, where a snake grows as it eats the food that it comes across and the game ends where the snake hits itself or goes out of bounds. This version is called Cabbage Worm since Cabbage worms love their cabbage, and the food in this game are cabbages.

With this version, however, the user is able to determine the width and height of the game's board as he/she pleases, so long each box within has a minimal dimension of 20x20px. The maximal dimensions of each tile is 50x50px.

# Features

### User determined board size 

Prior to the start of the game, the player is allowed to choose how big of a board to play on in terms of width and height in units of tile. If the requested dimension is greater than allowed, then the board will be built to the maximum allowed dimensions.

### Dynamic tile dimensions 

There is an upper limit to the dimensions as each tile has a minimal dimension of 20x20px. The maximal width and height are determined by the width and height of the window when the start button is pressed. The maximum dimensions of the gameboard's tiles are 50x50px, and the board will be centered in the window if it will not be large enough to touch the sides of the window.

### Random start position 

Each time the game starts, the worm will start in a different, randomly picked location.

### Speed up mechanism 

Each time the worm eats a cabbage, it will speed up by 10%.

### Game over type 

When the game is over, a message will be displayed on what the worm has hit.

### Scoring mechanism 

The game has a score count that records the score of the current game. It also records the highest score out of every game you've played since loading the board. The high score will only be recorded and changed when a game ends and a score check is done.

# Future features

### Poop 

As the worm eats a food and grows, a poop will exit at the last position of the tail. The poop will present an obstacle that the worm shall not encounter or the game would end. Up to 5 poops could be present on the board before the oldest one would disappear.

