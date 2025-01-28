// Variables to store scores and choices
let userScore = 0;
let appScore = 0;
let round = 1;

// Possible choices for the game
const choices = ['rock', 'paper', 'scissors'];

// Elements
const resultMessage = document.getElementById('resultMessage');
const finalResult = document.getElementById('finalResult');
const userSelection = document.getElementById('userSelection');
const appSelection = document.getElementById('appSelection');
const victoryModal = $('#victoryModal'); // Bootstrap modal
const victoryMessage = document.getElementById('victoryMessage');
const playAgainButton = document.getElementById('playAgainButton');

// Functions to handle game logic
function playRound(userChoice) {
  // Show user selection in the left box
  userSelection.textContent = `You chose ${userChoice}`;

  // Randomly select app choice
  const appChoice = choices[Math.floor(Math.random() * choices.length)];
  appSelection.textContent = `App chose ${appChoice}`;

  // Determine the winner
  if (userChoice === appChoice) {
    resultMessage.textContent = "Draw!";
  } else if (
    (userChoice === 'rock' && appChoice === 'scissors') ||
    (userChoice === 'paper' && appChoice === 'rock') ||
    (userChoice === 'scissors' && appChoice === 'paper')
  ) {
    resultMessage.textContent = "Victory!";
    userScore++;
  } else {
    resultMessage.textContent = "Loss!";
    appScore++;
  }

  // Update the score
  document.getElementById('userScore').textContent = `Your Score: ${userScore}`;
  document.getElementById('appScore').textContent = `App Score: ${appScore}`;

  // Check if someone wins the game
  if (userScore === 3) {
    victoryMessage.textContent = "You Win the Game!";
    victoryModal.modal('show');
    resetGame();
  } else if (appScore === 3) {
    victoryMessage.textContent = "App Wins the Game!";
    victoryModal.modal('show');
    resetGame();
  }
}

// Reset the game after someone wins
function resetGame() {
  setTimeout(() => {
    userScore = 0;
    appScore = 0;
    userSelection.textContent = "Your Choice";
    appSelection.textContent = "App Choice";
    document.getElementById('userScore').textContent = `Your Score: ${userScore}`;
    document.getElementById('appScore').textContent = `App Score: ${appScore}`;
    resultMessage.textContent = '';
    finalResult.textContent = '';
  }, 2000);
}

// Play Again Button
playAgainButton.addEventListener('click', () => {
  victoryModal.modal('hide');
  resetGame();
});

// Event Listeners for User Choices
document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));