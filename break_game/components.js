const cvs = document.getElementById("canvas");

let ctx = cvs.getContext("2d");

ctx.lineWidth = 3;

canvas.style.border = "1px solid black";

// let image = new Image();
// image.src = 'bg.webp';
// image.onload = function () {
//     ctx.drawImage(image, 0, 0);
// };

const PADDLE_HEIGHT = 20;
const PADDLE_WIDTH = 130;
const PADDLE_MARGIN_BOTTOM = 30;
const BALL_RADIUSE = 12;
let LIFE = 3;

const BLOCK_WIDTH = 60;
const BLOCK_HEIGHT = 25;
const PADDING_TOP = 20;
const PADDING_LEFT = 20;
const PADDING_FROM_WALL = 40;
const PADDING_FROM_TOP_WALL = 60;
let statusBlocks = true;

const ICONS_FROM_TOP = 20;
let blocks = [];

// FOR PADDLE MOVE
let rightPress = false;
let leftPress = false;

const paddle = {
  x: cvs.width / 2 - PADDLE_WIDTH / 2,
  y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dx: 5,
};

const ball = {
  x: cvs.width / 2,
  y: paddle.y - BALL_RADIUSE,
  dx: 3 * (Math.random() * 2) - 1,
  dy: -3,
  speed: 5,
  radiuse: BALL_RADIUSE,
};


function drawPaddle() {
  ctx.fillStyle = "#339af0";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = "#364fc7";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37) leftPress = true;
  if (event.keyCode === 39) rightPress = true;
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 37) leftPress = false;
  if (event.keyCode === 39) rightPress = false;
});

function movePaddle() {
  if (leftPress && paddle.x > 0) paddle.x -= paddle.dx;
  if (rightPress && paddle.x + paddle.width < cvs.width) paddle.x += paddle.dx;
}
function createBall() {
  //...
  ctx.beginPath();
  ctx.fillStyle = "#d0ebff";
  ctx.arc(ball.x, ball.y, ball.radiuse, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.strokeStyle = "#748ffc";
  ctx.stroke();
  ctx.closePath();
}

function moveBall() {
  //...
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function ballWallCollision(){
  if (ball.x + ball.radiuse > cvs.width || ball.x - ball.radiuse < 0) {
    ball.dx = -ball.dx;
  } 
  if (ball.y - ball.radiuse < 0) {
    ball.dy = -ball.dy;
  }
  if (ball.y + ball.radiuse > cvs.height) {
    LIFE--;
    resetBall();
  }
}

function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = paddle.y - ball.radiuse;
  ball.dx = 3 * (Math.random() * 2 -1);
  ball.dy = -3;
}

function ballAndPaddleCollasion() {
  if (
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width &&
    ball.y < paddle.y + paddle.height &&
    ball.y > paddle.y
  ) {
    soundPaddle.play();
    let collasitionedPoint = ball.x - (paddle.x + paddle.width / 2);
    collasitionedPoint = collasitionedPoint / (paddle.width / 2);
    let angel = collasitionedPoint * (Math.PI / 3);
    ball.dy = -Math.cos(angel) * ball.speed;
    ball.dx = Math.sin(angel) * ball.speed;
  }
}

// Breaks

const breaks = {
  fiillColor: "#51cf66",
  strokeColor: "#94d82d",
  row: 4,
  column: 7,
  width: BLOCK_WIDTH,
  height: BLOCK_HEIGHT,
  offsetFromLeft: PADDING_LEFT,
  offsetFromTop: PADDING_TOP,
};

function createBlock() {
  for (let r = 0; r < breaks.row; r++) {
    blocks[r] = [];
    for (let c = 0; c < breaks.column; c++) {
      blocks[r][c] = {
        x: c * (breaks.width + breaks.offsetFromLeft) + breaks.offsetFromLeft,
        y:
          r * (breaks.height + breaks.offsetFromTop) +
          PADDING_FROM_TOP_WALL +
          breaks.offsetFromTop,
        status: true,
      };
    }
  }
}

createBlock();

function drawBlocks() {
  for (let r = 0; r < breaks.row; r++) {
    for (let c = 0; c < breaks.column; c++) {
      if (blocks[r][c].status) {
        ctx.fillStyle = breaks.fiillColor;
        ctx.fillRect(
          blocks[r][c].x,
          blocks[r][c].y,
          breaks.width,
          breaks.height
        );
        ctx.strokeStyle = breaks.strokeColor;
        ctx.strokeRect(
          blocks[r][c].x,
          blocks[r][c].y,
          breaks.width,
          breaks.height
        );
      }
    }
  }
}

function ballAndBlocksCollasion() {
  for (let r = 0; r < breaks.row; r++) {
    for (let c = 0; c < breaks.column; c++) {
      let block = blocks[r][c];
      if (block.status) {
        if (
          ball.x - ball.radiuse < block.x + breaks.width &&
          block.x < ball.x + ball.radiuse &&
          ball.y + ball.radiuse > block.y &&
          ball.y - ball.radiuse < block.y + breaks.height
        ) {
          sound.play();
          ball.dy = -ball.dy;
          block.status = false;
        }
      }
    }
  }
}

// ICONS

let SCORE_IMG = "./img/score.png";
let LEVEL_IMG = "./img/level.png";
let LIFE_IMG = "./img/life.png";

function gameStates (img, anyText, textCoordX, textCoordY, ImgX, ImgY) {
  ctx.fillStyle = "white";
  ctx.font="20px Finger Paint";
  ctx.fillText(anyText, textCoordX, textCoordY);
  ctx.drawImage(img, ImgX, ImgY, width=25, height=25);
}

// gameStates(SCORE_IMG, '110', 20, 20, 0, 0);
// ctx.font = "30px Comic Sans MS";
// ctx.fillStyle = "red";
// ctx.textAlign = "center";
// ctx.fillText("Hello World", cvs.width/2, cvs.height/2);


function draw() {
  drawPaddle();
  drawBlocks();
  createBall();
}

function update() {
  movePaddle();
  moveBall();
  ballWallCollision();
  ballAndPaddleCollasion();
  ballAndBlocksCollasion();
}

function loop() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  draw();
  update();

  requestAnimationFrame(loop);
}
loop();

