

        // Initialize the canvas
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = 400;
        canvas.height = 500;

        // Bird properties
        const bird = {
            x: 50,
            y: 250,
            width: 20,
            height: 20,
            gravity: 0.5,
            lift: -10,
            velocity: 0,
        };

        // Pipe properties
        const pipes = [];
        const pipeWidth = 50;
        const gap = 100;
        let pipeSpeed = 2;

        // Game state
        let isGameOver = false;
        let score = 0;
        let passedPipes = 0;

        // Draw the bird
        function drawBird() {
            ctx.fillStyle = "yellow";
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        }

        // Update the bird's position
        function updateBird() {
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            // Prevent the bird from going off the bottom of the screen
            if (bird.y + bird.height > canvas.height) {
                bird.y = canvas.height - bird.height;
                bird.velocity = 0;
            }

            // Prevent the bird from going off the top of the screen
            if (bird.y < 0) {
                bird.y = 0;
                bird.velocity = 0;
            }
        }

        // Make the bird jump when clicking or pressing space
        function birdJump() {
            bird.velocity = bird.lift;
        }

        // Draw the background
        function drawBackground() {
            ctx.fillStyle = "skyblue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Create pipes
        function createPipes() {
            const pipeHeight = Math.floor(Math.random() * (canvas.height - gap));
            const bottomPipeY = pipeHeight + gap;

            pipes.push({
                x: canvas.width,
                topY: pipeHeight,
                bottomY: bottomPipeY
            });
        }

        // Draw pipes
        function drawPipes() {
            pipes.forEach((pipe) => {
                ctx.fillStyle = "green";
                ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topY); // Top pipe
                ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY); // Bottom pipe
            });
        }

        // Update pipes' positions
        function updatePipes() {
            pipes.forEach((pipe, index) => {
                pipe.x -= pipeSpeed;

                // Remove pipe if it goes off the left side of the screen
                if (pipe.x + pipeWidth < 0) {
                    pipes.splice(index, 1);
                }
            });

            // Create new pipes at intervals
            if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
                createPipes();
            }
        }

        // Check for collisions
        function checkCollisions() {
            // Check if the bird hits any pipe
            for (let i = 0; i < pipes.length; i++) {
                const pipe = pipes[i];
                if (
                    bird.x + bird.width > pipe.x && 
                    bird.x < pipe.x + pipeWidth && 
                    (bird.y < pipe.topY || bird.y + bird.height > pipe.bottomY)
                ) {
                    gameOver();
                }
            }

            // Check if the bird hits the ground
            if (bird.y + bird.height > canvas.height) {
                gameOver();
            }
        }

        // Check for scoring
        function checkScoring() {
            pipes.forEach((pipe) => {
                // Increment score if the bird passes the pipe
                if (bird.x + bird.width > pipe.x + pipeWidth && !pipe.passed) {
                    pipe.passed = true; // Mark this pipe as passed
                    score++;
                }
            });
        }

        // End the game
        function gameOver() {
            isGameOver = true;
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("Game Over!", canvas.width / 2 - 90, canvas.height / 2);
            ctx.fillText("Score: " + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
            ctx.fillText("Click or press Space to restart", canvas.width / 2 - 160, canvas.height / 2 + 80);
        }

        // Restart the game
        function restartGame() {
            if (isGameOver) {
                isGameOver = false;
                score = 0;
                passedPipes = 0;
                pipes.length = 0; // Clear pipes array
                bird.y = 250;     // Reset bird position
                bird.velocity = 0; // Reset bird velocity
                gameLoop();        // Restart game loop
            }
        }

        // Main game loop
        function gameLoop() {
            if (isGameOver) return;

            drawBackground();
            updateBird();
            drawBird();
            updatePipes();
            drawPipes();
            checkCollisions();
            checkScoring();

            requestAnimationFrame(gameLoop);
        }

        // Event listener for bird jump
        window.addEventListener("click", birdJump);
        window.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                birdJump();
            }
            // Restart game on click or spacebar after game over
            if (event.code === "Space" || event.type === "click") {
                restartGame();
            }
        });

        // Start the game loop
        gameLoop();
