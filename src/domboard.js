export const domBoard = (playerName, someBoard) => ({
  displayBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('board', `${playerName}`);
    boards.appendChild(board)

    let indexAdjust = 0;

    for (let i = 0; i < 10; i++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        board.appendChild(divRow);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', indexAdjust + j);
        divRow.appendChild(cell);
      }

      indexAdjust += 10;
    }
  },

  placeEventListener(playerName) {
    const board = document.querySelector(playerName);
    board.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        const attackedPosition = e.target.getAttribute('data-index');
        someBoard.receiveAttack(attackedPosition);
        console.log(someBoard.cellsNotAttacked())
      }
    })
  }
});