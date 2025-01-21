// Setting up the canvas and game elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the game variables
const gridSize = 20; // Size of each grid cell
let snake = [{ x: 160, y: 160 }]; // Snake starting position
let direction = { x: 0, y: 0 }; // Direction of movement
let food = spawnFood(); // Spawn food at a random location
let score = 0;
let gameOver = false;

// Listen for keyboard input
document.addEventListener("keydown", changeDirection);

// Function to change the snake's direction
function changeDirection(event) {
    if (gameOver) return;

    if (event.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (event.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (event.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (event.key === "ArrowRight" && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
}

// Game loop function
function gameLoop() {
    if (gameOver) return;

    setTimeout(function() {
        clearCanvas();
        moveSnake();
        checkCollision();
        drawSnake();
        drawFood();
        updateScore();
        gameLoop();
    }, 100); // Adjust game speed by changing the timeout value
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake based on direction
function moveSnake() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood(); // Spawn a new food
    } else {
        snake.pop(); // Remove the tail of the snake
    }
}

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Spawn food at random location
function spawnFood() {
    let x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

// Draw food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Check for collisions
function checkCollision() {
    let head = snake[0];

    // Check if the snake collides with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
        alert("Game Over! Your score was " + score);
    }

    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert("Game Over! Your score was " + score);
        }
    }
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

// Start the game loop
gameLoop();
