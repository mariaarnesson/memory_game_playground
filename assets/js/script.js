const cards = document.querySelectorAll('.memory-card');

const moveContainer = document.querySelector(".moves");
const instructions = document.getElementById('instructions');
const timeContainer = document.querySelector(".timer");
const MAX_MATCH = 6;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let finalTime = "";
let timeout;

function greet() {
	alert('Welcome to the memory game!');
   }
   setTimeout(greet, 2000); //execute greet after 2000 milliseconds (2 seconds)

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
	
 
	checkForMatch();
  }
 
  function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
 	isMatch ? disableCards() : unflipCards();
  }
  
  function myFunction() {
	timeout = setTimeout(alertFunc, 3000);
  }
  function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
  }
 
  function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");
    }, 400);
	setTimeout(() => {
	  firstCard.classList.remove("shake", "flip");
	  secondCard.classList.remove("shake", "flip");
	  resetBoard();
	}, 1500);

  
   // Add move
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

