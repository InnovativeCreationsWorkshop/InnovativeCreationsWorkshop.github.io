// gameFunctions.js

var ballX = 150;
var ballY = 50;
var ballSpeedX = Math.random() * 5 + 2;
var ballSpeedY = Math.random() * 5 + 2;
var framesPerSecond = 30;

var leftPaddleY = 150;
var rightPaddleY = 150;
var paddleHeight = 200;
var paddleWidth = 10;
var paddleSpeed = 5;

var leftScore = 0;
var rightScore = 0;
var gameOver = false;

var resetTimer = 30;

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + 5 > canvas.width || ballX - 5 < 0) {
    ballSpeedX = -ballSpeedX;
    ballSpeedX += (Math.random() - 0.5) * 2;
  }

  if (ballY + 5 > canvas.height || ballY - 5 < 0) {
    ballSpeedY = -ballSpeedY;
    ballSpeedY += (Math.random() - 0.5) * 2;
  }

  if (ballX - 5 < 100 + paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    if (ballSpeedX < 0) {
      ballSpeedX = -ballSpeedX;
      ballSpeedX += (Math.random() - 0.5) * 2;
      leftScore++;
    }
  }

  if (ballX + 5 > canvas.width - 100 - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    if (ballSpeedX > 0) {
      ballSpeedX = -ballSpeedX;
      ballSpeedX += (Math.random() - 0.5) * 2;
      rightScore++;
    }
  }

  if (leftScore >= 2 || rightScore >= 2) {
    gameOver = true;
  }
}

function movePaddles(event) {
  if (event.key === "w" || event.key === "W") {
    if (leftPaddleY > 0) leftPaddleY -= paddleSpeed;
  }
  if (event.key === "s" || event.key === "S") {
    if (leftPaddleY + paddleHeight < canvas.height) leftPaddleY += paddleSpeed;
  }

  if (event.key === "ArrowUp") {
    if (rightPaddleY > 0) rightPaddleY -= paddleSpeed;
  }
  if (event.key === "ArrowDown") {
    if (rightPaddleY + paddleHeight < canvas.height) rightPaddleY += paddleSpeed;
  }
}

function drawEverything() {
  if (!canvasContext) return;

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  var leftPaddleX = 100;
  var rightPaddleX = canvas.width - 100 - paddleWidth;

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(leftPaddleX, leftPaddleY, paddleWidth, paddleHeight);
  canvasContext.fillRect(rightPaddleX, rightPaddleY, paddleWidth, paddleHeight);

  var ballRadius = 5;
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  canvasContext.fillStyle = "white";
  canvasContext.fill();

  canvasContext.setLineDash([10, 10]);
  canvasContext.beginPath();
  canvasContext.moveTo(canvas.width / 2, 0);
  canvasContext.lineTo(canvas.width / 2, canvas.height);
  canvasContext.strokeStyle = "white";
  canvasContext.lineWidth = 2;
  canvasContext.stroke();

  canvasContext.font = "30px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Left: " + leftScore, 50, 50);
  canvasContext.fillText("Right: " + rightScore, canvas.width - 150, 50);
}

function displayWinScreen() {
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.7)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "white";
  canvasContext.font = "40px Arial";
  if (leftScore >= 2) {
    canvasContext.fillText("Left Player Wins!", canvas.width / 4, canvas.height / 2);
  } else if (rightScore >= 2) {
    canvasContext.fillText("Right Player Wins!", canvas.width / 4, canvas.height / 2);
  }

  if (resetTimer > 0) {
    resetTimer--;
  } else {
    resetGame();
  }
}

function resetGame() {
  leftScore = 0;
  rightScore = 0;
  ballX = 150;
  ballY = 50;
  ballSpeedX = Math.random() * 5 + 2;
  ballSpeedY = Math.random() * 5 + 2;
  leftPaddleY = 150;
  rightPaddleY = 150;
  gameOver = false;
  resetTimer = 30;
}
