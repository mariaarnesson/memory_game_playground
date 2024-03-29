const cards = document.querySelectorAll('.memory-card');
const counter = document.querySelector(".moves");
const matchSound = document.getElementById("matchSound");
const flipCardSound = document.getElementById("flipCardSound");
const gameover = document.getElementById('gameOverModal');
const instructionCloseBtn = document.getElementsByClassName('closeInstruction')[0];
const gameoverCloseBtn = document.getElementsByClassName('close')[0];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let hour = 0;
let finalTime = '';
let elapsedTime = 0;
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var memoryGame = document.querySelector('.memory-game');
var scorePanel = document.querySelector('.score-panel');
var interval;
var instruction = document.getElementById("myInstruction");
var btn = document.getElementById("instructionButton");


  // This is a function with which the user pressing the button
  // "game instruction" can open a modal showing us the text with
  // the instructions of the game.

  btn.onclick = function() {
    instruction.style.display = "block";
  };
  
  // When the user clicks on <span> (x), close the modal
  instructionCloseBtn.onclick = function() {

  instruction.style.display = "none";
  };

  // Thanks to this function, the user has the ability to change
  // the background to yellow color and photos in yellow tones.
  function changeBackgroundYellow() {
    document.body.style.backgroundColor = "#FFBA00";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/autumn-landscape-with-swamp-forest_107791-4624.jpg?w=1380&t=st=1676635346~exp=1676635946~hmac=95f4739b27d12c7c68acb06539af0b34088dcaaf025b9d48de4a1028a0af3b1d')";
  }

  // Thanks to this function, the user has the ability to change
  // the background to blue color and photos in blue tones.
  function changeBackgroundBlue() {
    document.body.style.backgroundColor = "rgb(6, 10, 50)";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/woman-girl-summer-camp-night_107791-11572.jpg?w=1380&t=st=1676635454~exp=1676636054~hmac=8c961b42435a3793f592eadf687dc846ce5ee5c12e098d8803a667aa0420ed7e')";
  }
  
  // Thanks to this function, the user has the ability to change
  // the background to dark color and photos in darker tones.
  function changeBackgroundGrey() {
    document.body.style.backgroundColor = "rgb(6, 10, 50)";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/night-forest-with-camp-fire-river-mountains_107791-6993.jpg?w=1380&t=st=1676633073~exp=1676633673~hmac=0f1969a485bee8d91bb929af0a58aaf57762936a000c2d680488f9438515f371')";
  }

  // Thanks to this function, the user can return to the background
  // in the original color and the original photo.
  function changeBackgroundWhite() {
    document.body.style.backgroundImage = "url('assets/images/background.jpg')";
  }
  // Thanks to this function, the div with id="home" is visible as soon
  // as the page loads. To go to the game board page, the user has to use this function,
  // then one of the pages is display to none and the other to flex.
  function startPage() {
    var home = document.getElementById("home");

    if (home.style.display === "none") {
        home.style.display = "flex";
        memoryGame.style.display = "none";
        scorePanel.style.display = "none";
    } else {
        home.style.display = "none";
        memoryGame.style.display = "flex";
        scorePanel.style.display = "block";
    }
  }

  // Thanks to this function, each time the user reveals a pair of cards with the same picture,
  // the user should hear a sound.
  function playMatchSound() {
    matchSound.currentTime = 0;
    matchSound.play();
  }

  // Thanks to this function, each time the cards are turned over,
  // the user should hear a sound.
  function playFlipCardSound() {
    flipCardSound.currentTime = 0;
    flipCardSound.play();
  }

  // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
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

  // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
  function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards();
  }
}

  // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    playMatchSound();
    displayStarIcon();
    moveCounter();

    if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
      displayGameOverModal();
      
    }
  }

  // This function allows the star icon to appear whenever the user
  // finds a pair of cards that match.
  function displayStarIcon() {
    const starIcon = document.getElementById('starIcon');
    const star = document.createElement('i');
    star.classList.add('fas', 'fa-star');
  
    starIcon.appendChild(star);
    starIcon.style.display = 'block';
  }

  // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
    moveCounter();
  }

  // This function allows each user's move to be counted
  // (each time the user presses a card).
  function moveCounter() {
      moves++;
      counter.innerHTML = moves;
      if(moves === 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
      }
  }

  // when moves start to be counted, there is also a timer that starts counting playing time.
  function startTimer(){
    interval = setInterval(function() {
        timer.innerHTML = minute+"min "+second+"sec";
        second++;
        elapsedTime++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }

        if (elapsedTime >= 90) {
          gameOver();
        }
       
      },1000);
  }

 // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // When the game is over, the counting game timer stops 
  // and the game over modal is shown.
  function gameOver() {
    clearInterval(interval);
    displayGameOverModal();
  }

  // This function was borrowed from this site:
  // https://marina-ferreira.github.io/tutorials/js/memory-game/
 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

  cards.forEach(card => card.addEventListener('click', flipCard));

 // Thanks to this function, the modal of the finished game is shown 
 // with the content where it is written how many moves the user made 
 // and also how long it took the user to playing the game. 
  function displayGameOverModal() {
    gameover.style.display = "block";
    finalTime = timer.innerHTML;

    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;

    let feedbackText = "";
    if (elapsedTime < 30) {
      feedbackText = "Very well! You finished the game very quickly.";
    } else if (elapsedTime < 90) {
      feedbackText = "You did very well, but you could do better!";
    } else {
      feedbackText = "I'm sorry but you lost. Let's try again!";
    }
    document.getElementById("feedback").innerHTML = feedbackText;

    gameOver(); 
  }

  //With this function, the user can close the modal by pressing "x".
  gameoverCloseBtn.onclick = function() {
    gameover.style.display = "none";
  };

  // Thanks to this function, the user can close the modal by pressing anywhere outside the modal.
  window.onclick = function(event) {
    if (event.target === gameover) {
      gameover.style.display = 'none';
    }
  };
  
  // Thanks to this function, the user can reset the game, and then the player's 
  //move counter is reset to zero, the time is reset to zero, 
  //and the revealed cards are covered up in order to start the game from the beginning.
  function restartGame() {
    moves = 0;
    elapsedTime = 0;
    counter.innerHTML = moves;

    const starIcon = document.getElementById('starIcon');
    starIcon.innerHTML = '';
    starIcon.style.display = 'none';

    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));

    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });

    
    clearInterval(interval);
    timer.innerHTML = '0mins 0secs';

    gameover.style.display = 'none';
    
  }

 