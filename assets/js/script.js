const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
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
timer();
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
