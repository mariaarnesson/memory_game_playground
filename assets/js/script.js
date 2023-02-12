const cards = document.querySelectorAll('.memory-card');
const moveContainer = document.querySelector(".moves");
const timeValue = document.getElementById("time");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let gameOn = false;
let interval;


let seconds = 0,
  minutes = 0;
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

function startPage() {
  var x = document.getElementById("start");
  if(x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  }



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
