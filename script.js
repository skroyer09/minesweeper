// const (constant, never changes)
// let (let me change)

const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

const totalCells = 100;
const totalBombs = 30;
const maxScore = 10;
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, "0");

  if (score === maxScore) {
    endGame(true);
  }
}

for (let i = 1; i <= 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame(false);
    } else {
      const adjacentBombs = countAdjacentBombs(i);
      if (adjacentBombs > 0) {
        cell.innerText = adjacentBombs;
      }
    }

    cell.classList.add("cell-clicked");
    updateScore();
  });

  grid.appendChild(cell);
}

function countAdjacentBombs(cellNumber) {
  let count = 0;
  const adjacentCells = [
    cellNumber - 11, cellNumber - 10, cellNumber - 9,
    cellNumber - 1, cellNumber + 1,
    cellNumber + 9, cellNumber + 10, cellNumber + 11
  ];

  adjacentCells.forEach(adjacent => {
    if (bombsList.includes(adjacent)) {
      count++;
    }
  });

  return count;
}


while (bombsList.length < totalBombs) {
  // Generate a random number between 1 and 100 //
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "You<br>won";
    endGameScreen.classList.add("win");
  }

  revealAllBombs();
  endGameScreen.classList.remove("hidden");
}

function revealAllBombs() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
    }
  }
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});
