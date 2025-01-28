// Variables to store scores and choices
let userScore = 0;
let appScore = 0;

// Possible choices for the game
const choices = ['rock', 'paper', 'scissors'];

// Icon classes for each choice
const icons = {
  rock: 'fas fa-hand-fist',
  paper: 'fas fa-hand',
  scissors: 'fas fa-hand-scissors',
};

// Elements
const resultMessage = document.getElementById('resultMessage');
const userSelection = document.getElementById('userSelection');
const appSelection = document.getElementById('appSelection');
const victoryModal = document.getElementById('victoryModal'); // Reference to modal
const victoryMessage = document.getElementById('victoryMessage');
const playAgainButton = document.getElementById('playAgainButton');

// Functions to handle game logic
function playRound(userChoice) {
  // Show user selection with the appropriate icon
  userSelection.innerHTML = `<i class="${icons[userChoice]}"></i>`;

  // Randomly select app choice
  const appChoice = choices[Math.floor(Math.random() * choices.length)];
  appSelection.innerHTML = `<i class="${icons[appChoice]}"></i>`;

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
  if (userScore === 3 || appScore === 3) {
    const winner = userScore === 3 ? "You Win the Game!" : "App Wins the Game!";
    victoryMessage.textContent = winner;

    // Use Bootstrap's modal methods to show the modal
    const bootstrapModal = new bootstrap.Modal(victoryModal); // Initialize modal
    bootstrapModal.show(); // Show modal
    disableGame(); // Disable buttons until "Play Again" is clicked
  }
}

// Function to disable the game buttons
function disableGame() {
  document.getElementById('rock').disabled = true;
  document.getElementById('paper').disabled = true;
  document.getElementById('scissors').disabled = true;
}

// Function to enable the game buttons
function enableGame() {
  document.getElementById('rock').disabled = false;
  document.getElementById('paper').disabled = false;
  document.getElementById('scissors').disabled = false;
}

// Reset the game after someone wins
function resetGame() {
  userScore = 0;
  appScore = 0;
  userSelection.innerHTML = `<i class="fas fa-question-circle"></i>`;
  appSelection.innerHTML = `<i class="fas fa-question-circle"></i>`;
  document.getElementById('userScore').textContent = `Your Score: ${userScore}`;
  document.getElementById('appScore').textContent = `App Score: ${appScore}`;
  resultMessage.textContent = '';
  enableGame(); // Re-enable the buttons for the next game
}

// Play Again Button
playAgainButton.addEventListener('click', () => {
  const bootstrapModal = bootstrap.Modal.getInstance(victoryModal); // Get instance of the modal
  bootstrapModal.hide(); // Hide modal
  resetGame();
});

// Event Listeners for User Choices
document.getElementById('rock').addEventListener('click', () => playRound('rock'));
document.getElementById('paper').addEventListener('click', () => playRound('paper'));
document.getElementById('scissors').addEventListener('click', () => playRound('scissors'));