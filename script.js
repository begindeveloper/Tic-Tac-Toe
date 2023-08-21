const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const resetButton = document.querySelector('button');

let currentPlayer = 'circle';
infoDisplay.textContent = "Circle goes first";

const startCells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.id = index;
        cellElement.addEventListener('click', addGo);
        gameboard.appendChild(cellElement);
    });
}

createBoard();

function addGo(e) {
    const cell = e.target;

    if (cell.classList.contains('square') && cell.textContent === "") {
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
        infoDisplay.textContent = "It is now " + currentPlayer + "'s turn.";
        cell.removeEventListener('click', addGo);
        checkScore();
    }
}

function checkScore() {
    const squares = document.querySelectorAll('.square');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[a].textContent === squares[c].textContent) {
            infoDisplay.textContent = currentPlayer === "circle" ? "Circle Wins!" : "Cross Wins!";
            return;
        }
    }

    if ([...squares].every(square => square.textContent !== "")) {
        infoDisplay.textContent = "It's a Draw!";
    }
}

function resetGame() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.textContent = "";
        square.addEventListener('click', addGo);
    });
    currentPlayer = 'circle';
    infoDisplay.textContent = "Circle goes first";
}

resetButton.addEventListener('click', resetGame);
