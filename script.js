const clickBox = document.querySelector(".clickBox");
const displayText = document.querySelector(".displayText");
const scoreEl = document.querySelectorAll(".score");
const scoreHistory = [];
const minMS = 2000; //2 seconds
const maxMS = 8000; //8 seconds

let msColorChange = 0;
let waitingOnClick = false;

function play() {
  // random num between minMS and maxMS
  const msUntilChange = Math.floor(Math.random() * (maxMS - minMS) + minMS);

  // change color back to red, it will fall back to css assigned color
  clickBox.style.backgroundColor = null;

  displayText.textContent = "";

  setTimeout(() => {
    msColorChange = Date.now();

    clickBox.style.backgroundColor = "#4cbb17";
    waitingOnClick = true;
  }, msUntilChange);
}

function addScore(score) {
  // add score to array, index 0
  scoreHistory.unshift(score);

  for (let i = 0; i < Math.min(scoreHistory.length, 5); i++) {
    const score = scoreHistory[i];

    scoreEl[i].textContent = `${score} ms`;
  }
}

clickBox.addEventListener("click", () => {
  if (waitingOnClick) {
    const score = Date.now() - msColorChange;
    waitingOnClick = false;
    displayText.textContent = `Your time was ${score} ms. Click to play again.`;

    addScore(score);
  } else {
    play();
  }
});
