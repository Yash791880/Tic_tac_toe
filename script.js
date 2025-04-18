const board = document.getElementById('board');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let cells = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function handleCellClick(index) {
      if (!gameActive || cells[index] !== '') return;

      cells[index] = currentPlayer;
      renderBoard();

      if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function renderBoard() {
      board.innerHTML = '';
      cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
      });
    }

    function checkWin() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      return winConditions.some(condition => {
        return condition.every(index => cells[index] === currentPlayer);
      });
    }

    function checkDraw() {
      return cells.every(cell => cell !== '');
    }

    renderBoard();