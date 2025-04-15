import { startGame, setupGame } from 'https://innovativecreationsworkshop.github.io/arcade/Snake/gameSetup.js';
import { theGame } from 'https://innovativecreationsworkshop.github.io/arcade/Snake/gameLoop.js';

const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
export { canvas, canvasContext };

let gameInterval;
let speed = 100;

window.onload = () => {
  console.log("Page is loaded!");
  startGame();
  setupGame();

  gameInterval = setInterval(theGame, speed);
  document.addEventListener('keydown', (e) => import('./snake.js').then(mod => mod.changeDirection(e)));
};

export function updateInterval(newSpeed) {
  clearInterval(gameInterval);
  gameInterval = setInterval(theGame, newSpeed);
}
