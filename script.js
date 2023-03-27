const gameBoard = document.getElementById("game-board");

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

const COLORS = [  
  "red",  
  "blue",  
  "green",  
  "orange",  
  "purple",  
  "red",  
  "blue",  
  "green",  
  "orange",  
  "purple"];

let cardsClicked = [];
let cards = [];

function createBoard() {
  // check if there are any cards on the board already
  if (gameBoard.hasChildNodes()) {
    gameBoard.innerHTML = "";
  }
  for (let i = 0; i < COLORS.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.color = COLORS[i];
    gameBoard.addEventListener('click', (event) => {
      if (event.target.classList.contains('card')) {
        handleCardClick(event);
      }
    });
    cards.push(card);
    gameBoard.appendChild(card);
  }
}

function startGame() {
  shuffleCards();
  createBoard();
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function resetCardColors() {
  cardsClicked[0].style.backgroundColor = "";
  cardsClicked[1].style.backgroundColor = "";

  //re-enable click events on all cards
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", handleCardClick);
  });
}

function handleCardClick(event) {
  const clickedCard = event.target;

  // Check if the clicked card is already matched or already in cardsClicked array
  if (clickedCard.classList.contains("matched") || cardsClicked.includes(clickedCard)) {
    return;
  }

  // If there are already two cards flipped over, do nothing
  if (cardsClicked.length === 2) {
    return;
  }

  // Add clicked card to the cardsClicked array
  cardsClicked.push(clickedCard);

  // Show color of the clicked card
  clickedCard.style.backgroundColor = clickedCard.dataset.color;

  // If two cards have been clicked, check if they match
  if (cardsClicked.length === 2) {
    const [firstCard, secondCard] = cardsClicked;

    // If the cards match, update their classes and clear the cardsClicked array
    if (firstCard.dataset.color === secondCard.dataset.color) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      cardsClicked = [];

      // Check if the game is over
      if (document.querySelectorAll(".card.matched").length === COLORS.length) {
        alert("Congratulations, you won!");
      }
    } else {
      // If the cards don't match, flip them back over after a delay and clear the cardsClicked array
      setTimeout(() => {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        cardsClicked = [];
      }, 1000);
    }
  }
}
    


// check for a win
function checkForWin() {
  const matchedCards = document.querySelectorAll(".match");
  if (matchedCards.length === COLORS.length) {
    alert("Congratulations! You won!");
  }
}
