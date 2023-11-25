let length;
let head;
let body;
let food;
let scl = 10;

function setup() {
  createCanvas(400, 400);

  length = 0;
  body = [];

  head = {
    x: floor(random(width / scl)),
    y: floor(random(height / scl)),
    dir: 1, // 0 = up, 1 = right, 2 = down, 3 = left
  };

  food = {
    x: floor(random(width / scl)),
    y: floor(random(height / scl)),
  };

  frameRate(10);
}

function draw() {
  background(0);

  fill(255);

  for (let piece of body) {
    piece.timeLeft--;
    rect(piece.x * scl, piece.y * scl, scl, scl);
  }
  rect(head.x * scl, head.y * scl, scl, scl);

  fill(255, 0, 0);
  rect(food.x * scl, food.y * scl, scl, scl);

  if (head.x === food.x && head.y === food.y) {
    food.x = floor(random(width / scl));
    food.y = floor(random(height / scl));

    length++;
  }

  switch (head.dir) {
    case 0:
      head.y--;
      break;
    case 1:
      head.x++;
      break;
    case 2:
      head.y++;
      break;
    case 3:
      head.x--;
      break;
    default:
      break;
  }

  for (let piece of body) {
    if (head.x === piece.x && head.y === piece.y) {
      console.log("You died.");
      noLoop();
    }
  }

  if (
    head.x > width / scl ||
    head.x < 0 ||
    head.y > height / scl ||
    head.y < 0
  ) {
    console.log("You died.");
    noLoop();
  }

  for (let i = 0; i < length; i++) {
    body.push({
      x: head.x,
      y: head.y,
      timeLeft: length,
    });
  }

  body = body.filter((piece) => piece.timeLeft >= 0);

  document.querySelector("#favicon").setAttribute("src", canvas.toDataURL());
}

function keyPressed() {
  switch (key) {
    case "ArrowUp":
      if (head.dir !== 2) head.dir = 0;
      break;
    case "ArrowRight":
      if (head.dir !== 3) head.dir = 1;
      break;
    case "ArrowDown":
      if (head.dir !== 0) head.dir = 2;
      break;
    case "ArrowLeft":
      if (head.dir !== 1) head.dir = 3;
      break;
    default:
      break;
  }
}
