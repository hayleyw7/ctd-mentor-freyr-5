// elements

const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");

// number variables

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;
let remainingAttempts = 5;

// returns a random number from min (inclusive) to max (exclusive)

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// hide messages after guess

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex <= messages.length - 1; elementIndex++) {
    messages[elementIndex].style.display = "none";
  };
};

// only allow whole nums

guessInput.addEventListener("input", function() {
  this.value = this.value.replace(/[^\d]/g, "");
});

// handle guess

function checkGuess() {
  hideAllMessages();
  let guessWord = "guesses";

  // get value from guess input element

  const guess = parseInt(guessInput.value, 10);

  // only take whole nums 1-99

  function isNumValid() {
    return guess >= 1 && guess <= 99 && !isNaN(guess);
  };

  // error handling

  function displayError() {
    const errorElement = document.getElementById("error");
    let error = "Unknown error";

    if (guess < 1) {
      error = "Must be greater than 0";
    } else if (guess > 99) {
      error = "Must be less than 100";
    };

    errorElement.textContent = error;
    resetButton.style.display = "none";
  };

  // what happens after guess checked

  function correctGuess() {
    if (attempts == 1) {
      guessWord = "guess";
    };

    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessWord}`;

    correctMessage.style.display = "";
    resetButton.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  };

  function wrongGuess() {
    remainingAttempts = maxNumberOfAttempts - attempts;

    if (remainingAttempts == 1) {
      guessWord = "guess";
    };

    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    };

    numberOfGuessesMessage.style.display = "";
    resetButton.style.display = "none";

    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;

    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
    };
  };

  if (isNumValid()) {
    attempts = attempts + 1;

    if (guess === targetNumber) {
      correctGuess();
    } else if (guess !== targetNumber) {
      wrongGuess();
    };

    guessInput.value = "";

  } else {
    displayError();
  };
};

function setup() {

  // get random number

  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // reset number of attempts

  maxNumberOfAttempts = 5;

  // enable the input and submit button

  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
};

// handle clicks

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
