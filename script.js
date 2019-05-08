let score = null;
let marginTop = 0;
let marginLeft = null;

document.addEventListener("DOMContentLoaded", function(){
	createDiv();
	createSnake();
	setKeyEvent();
});


function randomPos(a, b){
	return Math.random() * a - b;
}

function selectDiv(){
	let random = document.getElementsByClassName("random")[0];
	random.addEventListener("mouseover", deleteDiv)
}

function createDiv() {
	let div = document.createElement("div");
	let body = document.getElementsByTagName("body")[0];
	let clientHeight = document.body.clientHeight;
	let clientWidth = document.body.clientWidth;
	div.style.marginTop = randomPos(clientHeight, div.style.height) + "px";
	div.style.marginLeft = randomPos(clientWidth, div.style.width) + "px";
	div.setAttribute("class", "random")
	body.appendChild(div);
	selectDiv();
}


function deleteDiv() {
	let elem = document.getElementsByClassName("random")[0];
	elem.remove();
	createDiv();
	updateScore()
}

function updateScore(){
	let showScore = document.getElementById("score");
	score++;
	showScore.innerHTML = score;
}

function createSnake() {
	let div = document.createElement("div");
	let body = document.getElementsByTagName("body")[0];
	div.setAttribute("class", "snake")
	body.appendChild(div);
}


function setKeyEvent() {
	document.addEventListener("keydown", moveSnake)
}

function moveSnake(event) {
	let snake = document.getElementsByClassName("snake")[0];
	let e = event.keyCode;
	switch(e) {
		case 38: 		
		marginTop -= 2
		snake.style.marginTop = marginTop + "px";
		distance()
		break;
		case 40:
		marginTop += 2;
		snake.style.marginTop = marginTop + "px"
		distance();
		break;
		case 37:
		marginLeft -= 2;
		snake.style.marginLeft = marginLeft + "px";
		distance();
		break;
		case 39:
		marginLeft += 2;
		snake.style.marginLeft = marginLeft + "px";
		distance();
		break;
	}
}

 function getPositionAtCenter(element) {
   const {top, left, width, height} = element.getBoundingClientRect();
   return {
     x: left + width / 2,
     y: top + height / 2
   };
 }

function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  const dist = Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  //console.log(Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y));
  //console.log(typeof(dist))
  if(dist < 25) {
  	deleteDiv();
  }
}

function distance() {
	let snake = document.getElementsByClassName("snake")[0];
 	let random = document.getElementsByClassName("random")[0];
 	getDistanceBetweenElements(snake, random);
 }