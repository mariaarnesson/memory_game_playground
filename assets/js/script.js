const cards = document.querySelectorAll('.memory-card');
const moveContainer = document.querySelector(".moves");
const timeContainer = document.querySelector(".timer");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

//timer
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;
timeContainer.innerHTML = "Time " + minutes + " : " + seconds;

function timer() {
    time = setInterval(function() {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timeContainer.innerHTML = "Time " + minutes + " : " + seconds;
    }, 1000);
}
function stopTime() {
  clearInterval(time);
}
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
function flipCard() {
  if (!gameOn) {
    gameOn = true;
    timer();
}
  if (lockBoard) return;
 if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
 hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

 resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.add("shake");
    secondCard.classList.add("shake");
}, 400);
setTimeout(() => {
firstCard.classList.remove("shake", "flip");
secondCard.classList.remove("shake", "flip");
resetBoard();
}, 1500);
addMove();
}

//Move counter
moves = 0;
moveContainer.innerHtml = 0;

function addMove() {
    moves++;
    moveContainer.innerHTML = moves;

}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
 cards.forEach(card => {
   let ramdomPos = Math.floor(Math.random() * 12);
   card.style.order = ramdomPos;
 });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
