const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let playerSize = 50;
let playerX = canvas.width / 2 - playerSize / 2;
let playerY = canvas.height - playerSize * 2;
let playerSpeed = 10;

let obstacleSize = 50;
let obstacleSpeed = 5;
let obstacles = [];

let score = 0;
let level = 1;
let gameOver = false;

function createObstacle() {
    let x = Math.random() * (canvas.width - obstacleSize);
    let y = -obstacleSize;
    obstacles.push({ x: x, y: y });
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
            if (score % 10 === 0) {
                level++;
                obstacleSpeed++;
            }
        }
    }
    if (Math.random() < 0.02) {
        createObstacle();
    }
}

function checkCollision(obstacle) {
    return (
        playerX < obstacle.x + obstacleSize &&
        playerX + playerSize > obstacle.x &&
        playerY < obstacle.y + obstacleSize &&
        playerY + playerSize > obstacle.y
    );
}

function drawPlayer() {
    context.fillStyle = 'white';
    context.fillRect(playerX, playerY, playerSize, playerSize);
}

function drawObstacles() {
    context.fillStyle = 'red';
    for (let obstacle of obstacles) {
        context.fillRect(obstacle.x, obstacle.y, obstacleSize, obstacleSize);
    }
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 20);
    context.fillText(`Level: ${level}`, 10, 50);
}

function drawGameOver() {
    context.fillStyle = 'red';
    context.font = '40px Arial';
    context.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    context.fillStyle = 'white';
    context.fillText(`Final Score: ${score}`, canvas.width / 2 - 100, canvas.height / 2 + 50);
}

function update() {
    if (gameOver) {
        drawGameOver();
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateObstacles();
    drawPlayer();
    drawObstacles();
    drawScore();

    for (let obstacle of obstacles) {
        if (checkCollision(obstacle)) {
            gameOver = true;
        }
    }

    requestAnimationFrame(update);
}

canvas.addEventListener('mousemove', (event) => {
    playerX = event.offsetX - playerSize / 2;
});

update();
