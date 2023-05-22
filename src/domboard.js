import { shipSquad } from "./squad.js";

export const domBoard = (playerName, someBoard) => ({
  _squad: shipSquad().create(),

  get squad() {
    return this._squad;
  },

  set squad(value) {
    this._squad = value;
  },

  displayBoard() {
    const boards = document.querySelector(".boards");
    const board = document.createElement("div");
    board.classList.add("board", `${playerName}`);
    boards.appendChild(board);

    let indexAdjust = 0;

    for (let i = 0; i < 10; i++) {
      const divRow = document.createElement("div");
      divRow.classList.add("row");
      board.appendChild(divRow);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", indexAdjust + j);
        divRow.appendChild(cell);
      }

      indexAdjust += 10;
    }
  },

  createPlacementBoard() {
    const board = document.createElement("div");
    board.classList.add("place-ship");
    document.querySelector(".placing").appendChild(board);
    let indexAdjust = 0;

    for (let i = 0; i < 10; i++) {
      const divRow = document.createElement("div");
      divRow.classList.add("row");
      divRow.setAttribute('data-rowIndex', i);
      board.appendChild(divRow);

      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", indexAdjust + j);
        divRow.appendChild(cell);
      }

      indexAdjust += 10;
    }
  },

  createPlacementUI() {
    const body = document.querySelector("body");
    document.querySelector(".page-wrapper").classList.add('blurring');

    const placementScreen = document.createElement("div");
    placementScreen.classList.add("placing");
    body.appendChild(placementScreen);

    const h2 = document.createElement("h2");
    h2.textContent = "Place your ships";
    placementScreen.appendChild(h2);

    this.createPlacementBoard();

    console.log(this.squad);

    const shipInfo = document.createElement("div");
    shipInfo.classList.add("ship-info");

    const shipName = document.createElement('h3');
    shipName.textContent = this.squad[0].type;
    shipInfo.appendChild(shipName)
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("rotate-button");
    rotateButton.textContent = "Rotate";
    shipInfo.appendChild(rotateButton);
    placementScreen.appendChild(shipInfo);
  },

  placeShipListeners() {
    const placementScreen = document.querySelector('.placing');

    placementScreen.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('cell')) this.handleCellMouseOver(e.target);
    });

    placementScreen.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('cell')) this.handleMouseOut();  
    });

    /*     placementScreen.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) this.handleCellMouseClick(e.target);
    }); */  
  },

  placeEventListener(playerName) {
    const board = document.querySelector(playerName);
    board.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        const attackedPosition = e.target.getAttribute("data-index");
        someBoard.receiveAttack(attackedPosition);
        console.log(someBoard.cellsNotAttacked());
      }
    });
  },

  changeShipDirection() {
    document.querySelector('.rotate-button').addEventListener('click', () => {
      const mySquad = this.squad;
      console.log(mySquad);

      if (mySquad[0].direction === 'horizontal') {
        mySquad[0].direction = 'vertical';
        this._squad = mySquad
        console.log(this.squad[0].direction);
        return;
      }

      mySquad[0].direction = 'horizontal';
      this._squad = mySquad;
      console.log(this.squad[0].direction);
    });  
  },

  handleCellMouseOver(cell) {
    const row = cell.parentElement;
    const currentIndex = Number(cell.getAttribute('data-index'));
    const ships = this.squad;
    const currentShip = ships[0];
    cell.classList.add('highlighted');

    if (currentShip.direction === 'horizontal') {
      for (let i = 1; i < currentShip.size; i++) {
        if (currentIndex + i > 99) return;
        const nextCell = document.querySelector(`[data-index="${currentIndex + i}"]`);
        if (!row.contains(nextCell)) return;
        nextCell.classList.add('highlighted');
      }

      return
    }

    let offset = 10;
    for (let i = 1; i < currentShip.size; i++) {
      if (currentIndex + offset > 99) return;
      const nextCell = document.querySelector(`[data-index="${currentIndex + offset}"]`);
      nextCell.classList.add('highlighted')
      offset += 10;
    }
  },

  handleMouseOut() {
    const cells = document.querySelectorAll('.highlighted');
    cells.forEach((cell) => cell.classList.remove('highlighted'));   
  },

/*   handleCellMouseClick() {

  } */
  
});
