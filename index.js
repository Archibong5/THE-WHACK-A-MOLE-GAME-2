const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
const btn = document.querySelector('button');

function randomTime(min, max){
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if(hole === lastHole){
    console.log("Nah that's the same bud");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep(){
  const time = randomTime(100, 1500);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}


function startGame(){
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
}


function bonk(e){
  if(!e.isTrusted) return // cheater
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

let hue = 0;

function colorButton(){
  hue++;

  const now = new Date();
  const milliseconds = now.getMilliseconds();
  const color = `hsl(${hue}, 100%, 50%)`;
  const color2 = `hsl(${hue}, 20%, 50%)`;

  btn.style.backgroundColor = color;
  scoreBoard.style.color = color;


}

setInterval(colorButton, 10)


moles.forEach(mole => mole.addEventListener('click', bonk))
