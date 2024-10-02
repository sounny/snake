const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = generateFood();
let gameOver = false;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (gameOver) return;
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10 || isCollision(head)) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (keyPressed === 38 && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (keyPressed === 39 && direction.x === 0) {
        direction = { x: 1, y: 0 };
    } else if (keyPressed === 40 && direction.y === 0) {
        direction = { x: 0, y: 1 };
    }
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 10)),
        y: Math.floor(Math.random() * (canvas.height / 10))
    };
}

function isCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

gameLoop();
