document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('#gameboard');
    const infoDisplay = document.querySelector('#info');
    const startCells = ["", "", "", "", "", "", "", "", ""];
    let go = "circle";
    infoDisplay.textContent = "Circle goes first";

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
        if (!e.target.firstChild) {
            const goDisplay = document.createElement('div');
            goDisplay.classList.add(go);
            e.target.appendChild(goDisplay);
            go = go === "circle" ? "cross" : "circle";
            infoDisplay.textContent = "It is now " + go + "'s go.";
            e.target.removeEventListener('click', addGo);
            checkScore();
        }
    }

    function checkScore() {
        const allSquares = document.querySelectorAll('.square');
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                allSquares[a].firstChild &&
                allSquares[a].firstChild.classList.contains('circle') &&
                allSquares[b].firstChild &&
                allSquares[b].firstChild.classList.contains('circle') &&
                allSquares[c].firstChild &&
                allSquares[c].firstChild.classList.contains('circle')
            ) {
                infoDisplay.textContent = "Circle Wins";
                return;
            } else if (
                allSquares[a].firstChild &&
                allSquares[a].firstChild.classList.contains('cross') &&
                allSquares[b].firstChild &&
                allSquares[b].firstChild.classList.contains('cross') &&
                allSquares[c].firstChild &&
                allSquares[c].firstChild.classList.contains('cross')
            ) {
                infoDisplay.textContent = "Cross Wins!";
                return;
            }
        }

        // Check for a draw
        if ([...allSquares].every(square => square.firstChild)) {
            infoDisplay.textContent = "It's a Draw!";
        }
    }

    function resetGame() {
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => {
            square.innerHTML = '';
            square.addEventListener('click', addGo);
        });
        infoDisplay.textContent = "Circle goes first";
        go = "circle";
    }
    
    // Add this line to select the reset button and attach the click event handler
    const resetButton = document.querySelector('button');
    resetButton.addEventListener('click', resetGame);
});
