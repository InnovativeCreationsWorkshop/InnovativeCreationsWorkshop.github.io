// Global Variables
var canvas; //Canvas setup
var canvasContext; // 2D rendering context, drawing.
var ballX = 150; // x-coor of the ball
var ballY = 50; // y-coor of ball
var ballSpeedX = Math.random() * 5 + 2; // Random speed for X (between 2 and 7)
var ballSpeedY = Math.random() * 5 + 2; // Random speed for Y (between 2 and 7)
var framesPerSecond = 30; // Define frames per second

// Paddle variables
var leftPaddleY = 150;
var rightPaddleY = 150;
var paddleHeight = 200;
var paddleWidth = 10;
var paddleSpeed = 15; // Speed of paddle movement

// Score variables
var leftScore = 0; //Score for left player
var rightScore = 0; // Score for right player
var gameOver = false; // Bool Flag to track if the game is over
var resetTimer = 120; // To count down the reset after the win


// Initialize the game
window.onload = function () {
  console.log("Game On!");
  canvas = document.getElementById("gameCanvas");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }
  canvasContext = canvas.getContext("2d");

  // Listen for keydown events to move paddles
  window.addEventListener("keydown", movePaddles);

  // Update game every frame
  setInterval(function () {
    //Game Loop
    if (!gameOver) {
      moveEverything(); //function moveEverything called
      drawEverything(); //function drawEverything called
    } else {
      displayWinScreen(); //function winScreen called
    }
  }, 1000 / framesPerSecond);
};

//Movement and ball behavior
function moveEverything() {
  // Move the ball randomly in both X and Y directions
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off the canvas walls (left and right)
  if (ballX + 5 > canvas.width || ballX - 5 < 0) {
    ballSpeedX = -ballSpeedX; // Reverse horizontal direction
    ballSpeedX += (Math.random() - 0.5) * 2; // Add randomness to horizontal speed after bounce
  }

  // Bounce off the top and bottom walls
  if (ballY + 5 > canvas.height || ballY - 5 < 0) {
    ballSpeedY = -ballSpeedY; // Reverse vertical direction
    ballSpeedY += (Math.random() - 0.5) * 2; // Add randomness to vertical speed after bounce
  }

  // Check for collision with left paddle
  if (ballX - 5 < 100 + paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    if (ballSpeedX < 0) { // Ball is moving left
      ballSpeedX = -ballSpeedX; // Reverse horizontal direction
      ballSpeedX += (Math.random() - 0.5) * 2; // Add randomness to speed after bounce
      leftScore++; // Increment the left player score
    }
  }

  // Check for collision with right paddle
  if (ballX + 5 > canvas.width - 100 - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    if (ballSpeedX > 0) { // Ball is moving right
      ballSpeedX = -ballSpeedX; // Reverse horizontal direction
      ballSpeedX += (Math.random() - 0.5) * 2; // Add randomness to speed after bounce
      rightScore++; // Increment the right player score
    }
  }

  // Check if any player won
  if (leftScore >= 2 || rightScore >= 2) {
    gameOver = true; // End the game
    resetTimer = 30; // Start the reset countdown
  }
}

// Paddle movement based on key press
function movePaddles(event) {
  // Move left paddle with W (up) and S (down)
  if (event.key === "w" || event.key === "W") {
    if (leftPaddleY > 0) leftPaddleY -= paddleSpeed; // Move up, but stay within the canvas
  }
  if (event.key === "s" || event.key === "S") {
    if (leftPaddleY + paddleHeight < canvas.height) leftPaddleY += paddleSpeed; // Move down, but stay within the canvas
  }

  // Move right paddle with arrow keys
  if (event.key === "ArrowUp") {
    if (rightPaddleY > 0) rightPaddleY -= paddleSpeed; // Move up, but stay within the canvas
  }
  if (event.key === "ArrowDown") {
    if (rightPaddleY + paddleHeight < canvas.height) rightPaddleY += paddleSpeed; // Move down, but stay within the canvas
  }
}

//Draw the Game
function drawEverything() {
  if (!canvasContext) return;

  console.log("called drawEverything");
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  var leftPaddleX = 100; // Fixed distance from the left edge
  var rightPaddleX = canvas.width - 100 - paddleWidth; // Fixed distance from the right edge

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(leftPaddleX, leftPaddleY, paddleWidth, paddleHeight);  // Left paddle
  canvasContext.fillRect(rightPaddleX, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

  // Draw ball (circle)
  var ballRadius = 5; // You can adjust the size here
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  canvasContext.fillStyle = "white";
  canvasContext.fill();
  
  // Draw a dotted (dashed) line in the center of the canvas
  canvasContext.setLineDash([10, 10]); // 10px dash, 10px gap
  canvasContext.beginPath();
  canvasContext.moveTo(canvas.width / 2, 0); // Start from top center
  canvasContext.lineTo(canvas.width / 2, canvas.height); // Draw to bottom center
  canvasContext.strokeStyle = "white"; // Color of the dashed line
  canvasContext.lineWidth = 2; // Set the thickness of the line
  canvasContext.stroke();

  // Draw the scores
  canvasContext.font = "30px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Left: " + leftScore, 50, 50);  // Left player score
  canvasContext.fillText("Right: " + rightScore, canvas.width - 150, 50); // Right player score
}

//Win Screen 
function displayWinScreen() {
  // Display the winning message
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.7)"; // Semi-transparent background
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "white";
  canvasContext.font = "40px Arial";
  if (leftScore >= 2) {
    canvasContext.fillText("Left Player Wins!", canvas.width / 4, canvas.height / 2);
  } else if (rightScore >= 2) {
    canvasContext.fillText("Right Player Wins!", canvas.width / 4, canvas.height / 2);
  }

  // Start countdown for reset
  if (resetTimer > 0) {
    resetTimer--;
    canvasContext.font = "20px Arial";
    canvasContext.fillText("Resetting game in: " + resetTimer + " seconds", canvas.width / 3, canvas.height / 1.5);
  } else {
    resetGame();
  }
}

// Game reset function
function resetGame() {
  // Reset the game state
  leftScore = 0;
  rightScore = 0;
  ballX = 150;
  ballY = 50;
  ballSpeedX = Math.random() * 5 + 2;
  ballSpeedY = Math.random() * 5 + 2;
  leftPaddleY = 150;
  rightPaddleY = 150;
  gameOver = false;
}
