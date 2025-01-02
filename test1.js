const boxes = document.querySelectorAll(".box");
let turn = "X";
let vsComputer = false;

document.getElementById("vsPlayer").addEventListener("click", () => {
  vsComputer = false;
  startGame();
});

document.getElementById("vsComputer").addEventListener("click", () => {
  vsComputer = true;
  startGame();
});

function startGame() {
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".game").style.display = "grid";
  resetGame();
}

for (const box of boxes) {
  box.addEventListener("click", function() {
    if (box.textContent === "") {
      box.textContent = turn;
      if (checkWin()) {
        let winner = turn;
        setTimeout(() => {
          alert(winner + " wins!");
          resetGame();
        }, 100);
      } else if (isDraw()) {
        setTimeout(() => {
          alert("It's a draw!");
          resetGame();
        }, 100);
      } else {
        turn = turn === "X" ? "O" : "X";
        if (vsComputer && turn === "O") {
          setTimeout(computerMove, 600); // 0.6-second delay
        }
      }
    }
  });
}

function computerMove() {
  const emptyBoxes = [...boxes].filter(box => box.textContent === "");
  let moveMade = false;

  // Try to block the player's winning move
  for (const box of emptyBoxes) {
    box.textContent = "O";
    if (checkWin()) {
      moveMade = true;
      break;
    }
    box.textContent = "";
  }

  // If no blocking move, make a random move
  if (!moveMade) {
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.textContent = "O";
  }

  if (checkWin()) {
    let winner = "O";
    setTimeout(() => {
      alert(winner + " wins!");
      resetGame();
    }, 100);
  } else if (isDraw()) {
    setTimeout(() => {
      alert("It's a draw!");
      resetGame();
    }, 100);
  } else {
    turn = "X";
  }
}

function checkWin() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  return [...boxes].every(box => box.textContent !== "");
}

function resetGame() {
  for (const box of boxes) {
    box.textContent = "";
  }
  turn = "X";
  if (vsComputer && turn === "O") {
    setTimeout(computerMove, 600); // 0.6-second delay
  }
}