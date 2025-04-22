
// Get the canvas element and its 2D context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a simple rectangle on the canvas
ctx.fillStyle = 'black';  // Set the color for the rectangle
ctx.fillRect(50, 50, 500, 500);  // Draw the rectangle at position (50, 50) with width 200 and height 100
