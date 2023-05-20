export const domBoard = (playerName, someBoard) => ({
  displayBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add(`board`);
    boards.appendChild(board)
    
    for (let i = 0; i < 10; i++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        board.appendChild(divRow);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i + j);
        divRow.appendChild(cell);
      }
    }
  },
});