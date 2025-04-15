import { startGame, setupGame } from 'https://innovativecreationsworkshop.github.io/arcade/Snake/gameSetup.js';
import { theGame } from 'https://innovativecreationsworkshop.github.io/arcade/Snake/gameLoop.js';

const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
export { canvas, canvasContext };

let gameInterval;
let speed = 100;

// Pre-import the changeDirection function from snake.js
import { changeDirection } from 'https://innovativecreationsworkshop.github.io/arcade/Snake/snake.js';

window.onload = () => {
  console.log("Page is loaded!");
  startGame();
  setupGame();

  gameInterval = setInterval(theGame, speed);
  
  // Use the pre-imported changeDirection function
  document.addEventListener('keydown', (e) => {
    changeDirection(e);
  });
};

export function updateInterval(newSpeed) {
  clearInterval(gameInterval);
  gameInterval = setInterval(theGame, newSpeed);
}
