const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
var snakeArray, direction, food, foodSize, score, gameInterval;
var isGameOver = false;
var speed = 100;


//Onload
window.onload = function(){
  console.log("Page is loaded!");
  //call functions main setup and actual game here
  startGame();
  console.log("Game is Starting!");
  setupGame();
  
  
  // CALL theGame function draws every frame
  gameInterval = setInterval(theGame, speed);

  
  // Calls changeDirection function
      document.addEventListener('keydown', changeDirection);
  
}

function startGame() {
  // After clicking Play, hide the splash screen and start the game.
  document.getElementById('splashScreen').style.display = 'none';

}

//call all assets here
function setupGame(){
      snakeArray = [{x: 50, y: 50}, {x: 40, y: 50}, {x: 30, y: 50}];
      direction = 'RIGHT';
      food = {};
      foodSize = 10;
      generateFood();
      isGameOver = false;
      score = 0;
}

//the actual game mechanics
function theGame(){
    drawCanvas();
    drawSnake();
    drawFood();
    moveSnake();
   
    
    if (checkWallCollision() || checkSelfCollision()) {
        gameOver();
        return;
    }
    
    checkFoodCollision();
}

//Game background
function drawCanvas(){
  canvasContext.fillStyle = '#ceddbb';
  canvasContext.fillRect(0,0, canvas.width, canvas.height);
}

//the snake 
function drawSnake() {
      canvasContext.fillStyle = '#ce9a60'; // Beige snake
      for (var i = 0; i < snakeArray.length; i++) {
        canvasContext.fillRect(snakeArray[i].x, snakeArray[i].y, 10, 10); // Snake segments
      }
    }

//The Food for snake
function drawFood() {
      canvasContext.fillStyle = '#b9375e'; // Dark pink food
      canvasContext.fillRect(food.x, food.y, foodSize, foodSize);
    }

function generateFood() {
      // Random position for food (multiples of 10 for alignment with snake)
      food.x = Math.floor(Math.random() * (canvas.width / foodSize)) * foodSize;
      food.y = Math.floor(Math.random() * (canvas.height / foodSize)) * foodSize;
    }


//Move the snake and change directions
function moveSnake() {
      var head = {...snakeArray[0]}; // Create a new head based on the current head

      // Update the head's position based on direction
      if (direction === 'RIGHT') head.x += 10;
      if (direction === 'LEFT') head.x -= 10;
      if (direction === 'UP') head.y -= 10;
      if (direction === 'DOWN') head.y += 10;

      snakeArray.unshift(head); // Add new head to the front
      snakeArray.pop(); // Remove the last segment (tail)
    }

function changeDirection(event) {
      if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
      }
      if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
      }
      if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
      }
      if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
      }
    }



//Collisions
function checkFoodCollision() {
      var head = snakeArray[0];

      // Check if the snake's head collides with the food
      if (head.x === food.x && head.y === food.y) {
        // Grow the snake
        snakeArray.push({x: head.x, y: head.y});
        generateFood(); // Generate a new food
        score++; // Increment score
      }
  
  // Increase game speed (decrease the interval)
    if (gameSpeed > 50) {  // Don't make the speed too fast
      gameSpeed -= 5;  // Increase speed after each food consumption
      clearInterval(gameInterval);  // Clear current game interval
      gameInterval = setInterval(theGame, speed);  // Set new game interval with increased speed
    }
    }

    function checkWallCollision() {
      var head = snakeArray[0];

      // Check if the snake hits the walls (canvas boundaries)
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
      }
      return false;
    }

    function checkSelfCollision() {
      var head = snakeArray[0];

      // Check if the snake's head collides with its body
      for (var i = 1; i < snakeArray.length; i++) {
        if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
          return true;
        }
      }
      return false;
    }
  
  //GAME OVER
   function gameOver() {
      isGameOver = true;
      clearInterval(gameInterval); // Stop the game loop
      document.getElementById('gameOverMessage').innerHTML = 'Game Over!';
      document.getElementById('score').innerHTML = 'Final Score: ' + score;
      document.getElementById('restartButton').style.display = 'block'; // Show the restart button
    }

// GAME OVER
function gameOver() {
  isGameOver = true;
  clearInterval(gameInterval);  // Stop the game loop
  document.getElementById('gameOverMessage').innerHTML = 'Game Over!';
  document.getElementById('score').innerHTML = 'Final Score: ' + score;
  document.getElementById('restartButton').style.display = 'block';  // Show the restart button
}