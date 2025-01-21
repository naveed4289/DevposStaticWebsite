// Set up the canvas and game elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the car and the lane width
const carWidth = 30;
const carHeight = 50;
const laneWidth = 100;

// Set initial car position
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;
let carSpeed = 5;
let carMovingLeft = false;
let carMovingRight = false;

// Set the game speed and the obstacles
let obstacles = [];
let score = 0;
let gameOver = false;

// Listen for keydown events to control the car
document.addEventListener('keydown', moveCar);
document.addEventListener('keyup', stopCar);

// Function to move the car
function moveCar(event) {
    if (event.key === 'ArrowLeft') {
        carMovingLeft = true;
    }
    if (event.key === 'ArrowRight') {
        carMovingRight = true;
    }
}

// Function to stop the car from moving
function stopCar(event) {
    if (event.key === 'ArrowLeft') {
        carMovingLeft = false;
    }
    if (event.key === 'ArrowRight') {
        carMovingRight = false;
    }
}

// Function to generate obstacles
function generateObstacle() {
    const lane = Math.floor(Math.random() * 3);
    const obstacleX = lane * laneWidth + (laneWidth - carWidth) / 2;
    obstacles.push({ x: obstacleX, y: -carHeight, width: carWidth, height: carHeight });
}

// Function to update the score
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to check for collisions
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (
            carX < obstacle.x + obstacle.width &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacle.height &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true;
            alert('Game Over! Your score was ' + score);
        }
    }
}

// Function to move the obstacles down
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 5;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

// Function to draw the car
function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

// Function to draw obstacles
function drawObstacles() {
    ctx.fillStyle = 'green';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Function to update the game
function updateGame() {
    if (gameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the car
    if (carMovingLeft && carX > 0) {
        carX -= carSpeed;
    }
    if (carMovingRight && carX < canvas.width - carWidth) {
        carX += carSpeed;
    }

    // Move obstacles
    moveObstacles();

    // Check for collisions
    checkCollisions();

    // Draw the car and obstacles
    drawCar();
    drawObstacles();

    // Update the score
    updateScore();

    // Generate obstacles
    if (Math.random() < 0.02) {
        generateObstacle();
    }

    // Request the next frame
    requestAnimationFrame(updateGame);
}

// Start the game loop
updateGame();
