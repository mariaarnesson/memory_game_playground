const cards = document.querySelectorAll('.memory-card');
const counter = document.querySelector(".moves");
const matchSound = document.getElementById("matchSound");
const flipCardSound = document.getElementById("flipCardSound");
const modal = document.getElementById('gameOverModal');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let moves = 0;
  var second = 0, minute = 0; hour = 0;
  var timer = document.querySelector(".timer");
  var interval;

  function playMatchSound() {
    matchSound.currentTime = 0; // Reset the sound to the beginning
    matchSound.play();
  }

  function playFlipCardSound() {
    flipCardSound.currentTime = 0;
    flipCardSound.play();
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    playFlipCardSound();
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    
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
    playMatchSound();
    displayStarIcon();

    if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
      displayGameOverModal();
      
    }
  }

  function displayStarIcon() {
    const starIcon = document.getElementById('starIcon');
    const star = document.createElement('i');
    star.classList.add('fas', 'fa-star');
  
    starIcon.appendChild(star);
    starIcon.style.display = 'block'; // Make the star icon visible
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
    moveCounter();
  }

  function moveCounter() {
      moves++;
      counter.innerHTML = moves;
      if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
      }
  }

  function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
       
    },1000);
}



  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function gameOver() {
    clearInterval(interval);
    displayGameOverModal();

  }

 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

  cards.forEach(card => card.addEventListener('click', flipCard));


  function displayGameOverModal() {
    modal.style.display = "block";
    finalTime = timer.innerHTML;

    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    gameOver();
  }

  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('close')) {
      document.getElementById('gameOverModal').style.display = "none";
    }
  });
