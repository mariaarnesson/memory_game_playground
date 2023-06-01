const cards = document.querySelectorAll('.memory-card');
const counter = document.querySelector(".moves");
const matchSound = document.getElementById("matchSound");
const flipCardSound = document.getElementById("flipCardSound");
const modal = document.getElementById('gameOverModal');
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let moves = 0;
  let elapsedTime = 0;
  var second = 0, minute = 0; hour = 0;
  var timer = document.querySelector(".timer");
  var memoryGame = document.querySelector('.memory-game');
  var interval;
  var instruction = document.getElementById("myInstruction");
  var btn = document.getElementById("instructionButton");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
    instruction.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    instruction.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      instruction.style.display = "none";
    }
  }

  // Background color

  function changeBackgroundYellow() {
    document.body.style.backgroundColor = "#FFBA00";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/autumn-landscape-with-swamp-forest_107791-4624.jpg?w=1380&t=st=1676635346~exp=1676635946~hmac=95f4739b27d12c7c68acb06539af0b34088dcaaf025b9d48de4a1028a0af3b1d')";
  }

  function changeBackgroundBlue() {
    document.body.style.backgroundColor = "rgb(6, 10, 50)";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/woman-girl-summer-camp-night_107791-11572.jpg?w=1380&t=st=1676635454~exp=1676636054~hmac=8c961b42435a3793f592eadf687dc846ce5ee5c12e098d8803a667aa0420ed7e')";
  }
  
  function changeBackgroundGrey() {
    document.body.style.backgroundColor = "rgb(6, 10, 50)";
    document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/night-forest-with-camp-fire-river-mountains_107791-6993.jpg?w=1380&t=st=1676633073~exp=1676633673~hmac=0f1969a485bee8d91bb929af0a58aaf57762936a000c2d680488f9438515f371')";
  }
  function changeBackgroundWhite() {
    document.body.style.backgroundImage = "url('assets/images/background.jpg')";
  }
  // Instruction function
function gameInstruction() {
  var x = document.getElementById("instruction");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

  // Home
  function startPage() {
    var home = document.getElementById("home");
    var endGameMessage = document.getElementById("endGameMessage");

    if (home.style.display === "none") {
        home.style.display = "flex";
        memoryGame.style.display = "none";
        endGameMessage.style.display = "none";
    } else {
        home.style.display = "none";
        memoryGame.style.display = "flex";
        endGameMessage.style.display = "none"
    
    }
  }



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
    interval = setInterval(function() {
        timer.innerHTML = minute+"mins "+second+"secs";
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

        if (elapsedTime >= 120) {
          endGame();
        }
       
      },1000);
  }

  function endGame() {

    var endGameMessage = document.getElementById("endGameMessage");
    finalTime = timer.innerHTML;

    clearInterval(interval);
    endGameMessage.style.display = "flex";
    memoryGame.style.display = "none";
    
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    
    

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
