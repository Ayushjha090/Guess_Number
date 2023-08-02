// Getting all the elements
const body = document.querySelector("body");
const resetBtn = document.querySelector(".btn");
const number = document.querySelector(".number");
const input = document.querySelector("#input-number");
const submitBtn = document.querySelector(".btn-check");
const gameMessage = document.querySelector(".game-message");
const score = document.querySelector("#score");
const highScore = document.querySelector("#high-score");
const errorMessage = document.querySelector(".error-message");

let gameScore = Number(score.innerHTML);
const settingHighScore = () => {
  highScore.innerHTML =
    window.localStorage.getItem("highScore") !== null
      ? window.localStorage.getItem("highScore")
      : 0;
};
settingHighScore();

// Generating the random number which will be common for the duration of the game
const generateRandomNumber = () => {
  const MAX_VALUE = 19;
  return Math.floor(Math.random() * MAX_VALUE) + 1; // because want the random number to be between 1 and 20
};

let actualNumber = generateRandomNumber();

// handling game play
const helperFunction = (gameScore, message) => {
  score.innerHTML = gameScore;
  gameMessage.innerHTML = message;
};

const handleGameLose = () => {
  score.innerHTML = 0;
  body.style.backgroundColor = "red";
  gameMessage.innerHTML = "💥 You lost the game!";
  submitBtn.setAttribute("disabled", true);
};

const main = () => {
  const inputNumber = input.value;
  if (+inputNumber > 20 || +inputNumber < 1) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    if (+inputNumber === actualNumber) {
      body.style.backgroundColor = "#248f24";
      const gameHighScore = window.localStorage.getItem("highScore");
      if (gameHighScore === null || gameScore > gameHighScore) {
        highScore.innerHTML = gameScore;
        window.localStorage.setItem("highScore", gameScore);
      }
      number.innerHTML = actualNumber;
      gameMessage.innerHTML = "🎉 Correct Number!";
    } else if (+inputNumber < actualNumber) {
      gameScore--;
      if (gameScore) helperFunction(gameScore, "Your guess is too small!");
      else handleGameLose();
    } else {
      gameScore--;
      if (gameScore) helperFunction(gameScore, "Yout guess is too big!");
      else handleGameLose();
    }
  }
};

submitBtn.addEventListener("click", main);

// handling game reset
const handleGameReset = () => {
  body.style.backgroundColor = "black";
  number.innerHTML = "?";
  gameMessage.innerHTML = "Start guessing...";
  score.innerHTML = 20;
  input.value = "";
  settingHighScore();
  errorMessage.style.display = "none";
};

resetBtn.addEventListener("click", handleGameReset);
