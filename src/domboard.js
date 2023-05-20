import {shipSquad} from './squad.js';

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

  shipPlacementBoard() {
    const board = document.createElement('div');
    board.classList.add('place-ship');
    document.querySelector('.placing').appendChild(board);
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



  placeShips() {
    const body = document.querySelector('body');
    const pageWrapper = document.querySelector('.page-wrapper');
    // pageWrapper.classList.add('blurring');
    const placementScreen = document.createElement('div');
    placementScreen.classList.add('placing');
    body.appendChild(placementScreen);

    const h2 = document.createElement('h2');
    h2.textContent = 'Place your ships';
    placementScreen.appendChild(h2);

    this.shipPlacementBoard();

    const shipInfo = document.createElement('div');
    shipInfo.classList.add('ship-info');
    const h3 = document.createElement('h3');
    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate-button');
    rotateButton.textContent = 'Rotate';
    shipInfo.appendChild(h3);
    shipInfo.appendChild(rotateButton);
    placementScreen.appendChild(shipInfo);

    const squad = shipSquad().create();
    console.log(squad);

/*     for (const i of positions) {
      this.board[i].ship = someShip.type;
      this.board[i].stillAlive = true;
    } */
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