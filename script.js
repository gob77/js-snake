let score = null;
let marginTop = null;
let marginLeft = null;

document.addEventListener("DOMContentLoaded", function() {
    createFood();
    createSnake();
});

function createSnake() {
    let div = document.createElement("div");
    let gameArea = document.getElementById("game-area");
    div.setAttribute("class", "snake");
    gameArea.appendChild(div);
    setMovement();
}

let setMovement = () => document.addEventListener("keydown", moveSnake);

function createFood() {
    let div = document.createElement("div");
    let gameArea = document.getElementById("game-area");
    let position = (a, b) => Math.round((Math.random() * (a - b)) / 10) * 10;
    div.style.marginTop = `${position(gameArea.offsetHeight, div.style.height)}px`;
    div.style.marginLeft = `${position(gameArea.offsetWidth, div.style.width)}px`;
    div.setAttribute("class", "food");
    gameArea.appendChild(div);
}

function deleteFood() {
    let elem = document.getElementsByClassName("food")[0];
    elem.remove();
    createFood();
    updateScore();
}

function updateScore() {
    let showScore = document.getElementById("score");
    score++;
    showScore.innerHTML = "Score = " + score;
}

function moveSnake(event) {
    let snake = document.getElementsByClassName("snake")[0];
    let e = event.keyCode;
    switch (e) {
        case 38:
            marginTop -= 10;
            snake.style.marginTop = `${marginTop}px`;
            distance();
            areaLimits();
            break;
        case 40:
            marginTop += 10;
            snake.style.marginTop = `${marginTop}px`;
            distance();
            areaLimits();
            break;
        case 37:
            marginLeft -= 10;
            snake.style.marginLeft = `${marginLeft}px`;
            distance();
            areaLimits();
            break;
        case 39:
            marginLeft += 10;
            snake.style.marginLeft = `${marginLeft}px`;
            distance();
            areaLimits();
            break;
    }
}

function getPositionAtCenter(element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);
    const dist = Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
    if (dist === 0) {
        deleteFood();
    }
}

function distance() {
    let snake = document.getElementsByClassName("snake")[0];
    let food = document.getElementsByClassName("food")[0];
    getDistanceBetweenElements(snake, food);
}

function areaLimits() {
    let [area, snake] = [document.getElementById("game-area"), document.getElementsByClassName("snake")[0]];
    let [top, left] = [window.getComputedStyle(snake).marginTop, window.getComputedStyle(snake).marginLeft];
    let [areaHeight, areaWidth] = [window.getComputedStyle(area).height, window.getComputedStyle(area).width];

    if (parseInt(top) > parseInt(areaHeight) - parseInt(window.getComputedStyle(snake).height)) {
        snake.style.marginTop = `390px`;
        marginTop = 390;
    } else if (parseInt(left) > parseInt(areaWidth) - parseInt(window.getComputedStyle(snake).width)) {
        snake.style.marginLeft = `590px`;
        marginLeft = 590;
    } else if (parseInt(top) < 0) {
        snake.style.marginTop = `0px`;
        marginTop = 0;
    } else if (parseInt(left) < 0) {
        snake.style.marginLeft = `0px`;
        marginLeft = 0;
    }
}

// the code below is for future testing

/*

document.addEventListener("keydown", move)
let cvs = document.getElementById("cvs");
let ctx = cvs.getContext("2d");

let x = 50;
let y = 60;

let direction = "right"

function drawSnake(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 10, 10);  
}

setInterval(function(){
  if(direction === "right") {
    x += 10;
    drawSnake(x, y)
  } else if(direction === "left") {
    x -= 10;
    drawSnake(x, y)
  } else if(direction === "up") {
    y -= 10;
    drawSnake(x, y)
  } else if(direction === "down") {
    y += 10;
    drawSnake(x, y)
  }
}, 100)

function move(e){
  if(e.keyCode === 37) {
    direction = "left";
  } else if(e.keyCode === 38) {
    direction = "up";
  } else if(e.keyCode === 39) {
    direction = "right";
  } else if(e.keyCode === 40) {
    direction = "down"
  }
}

*/
