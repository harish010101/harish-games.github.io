const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

let bird = {
    x: 150,
    y: 150,
    width: 40,
    height: 30,
    gravity: 0.6,
    lift: -15,
    velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
    context.fillStyle = 'yellow';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function createPipe() {
    let pipeWidth = 50;
    let pipeGap = 200;
    let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        y: 0,
        width: pipeWidth,
        height: pipeHeight
    });
    pipes.push({
        x: canvas.width,
        y: pipeHeight + pipeGap,
        width: pipeWidth,
        height: canvas.height - pipeHeight - pipeGap
    });
}

function drawPipes() {
    context.fillStyle = 'green';
    for (let pipe of pipes) {
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function updatePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 3;
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            i--;
            score++;
        }
    }
}

function checkCollision() {
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        return true;
    }
    for (let pipe of pipes) {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + pipe.height &&
            bird.y + bird.height > pipe.y
        ) {
            return true;
        }
    }
    return false;
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`Score: ${score}`, 10, 20);
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

    frame++;
    context.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    drawBird();

    if (frame % 75 === 0) {
        createPipe();
    }

    updatePipes();
    drawPipes();
    drawScore();

    if (checkCollision()) {
        gameOver = true;
    }

    requestAnimationFrame(update);
}

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

update();

