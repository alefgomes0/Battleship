import { shipSquad } from "./squad.js";

export const domBoard = (playerName, someBoard, player) => ({
  _squad: shipSquad().create(),

  get squad() {
    return this._squad;
  },

  set squad(value) {
    this._squad = value;
  },

  displayBoard() {
    const boards = document.querySelector(".boards");
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    const board = document.createElement("div");
    board.classList.add("board", `${playerName}`);
    boardContainer.appendChild(board);
    boardContainer.appendChild(this.labelBoard());
    boards.appendChild(boardContainer);

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

  labelBoard() {
    const h5 = document.createElement("h5");
    h5.classList.add("board-label");
    if (playerName === "human") {
      h5.textContent = "Your Board";
      return h5;
    }

    h5.textContent = "Opponent's Board";
    return h5;
  },

  createPlacementBoard() {
    const board = document.createElement("div");
    board.classList.add("place-ship");
    document.querySelector(".placing").appendChild(board);
    let indexAdjust = 0;

    for (let i = 0; i < 10; i++) {
      const divRow = document.createElement("div");
      divRow.classList.add("row");
      divRow.setAttribute("data-rowIndex", i);
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
    document.querySelector(".page-wrapper").classList.add("blurring");

    const placementScreen = document.createElement("div");
    placementScreen.classList.add("placing");
    body.appendChild(placementScreen);

    const h2 = document.createElement("h2");
    h2.textContent = "Place your ships";
    placementScreen.appendChild(h2);

    this.createPlacementBoard();

    const shipInfo = document.createElement("div");
    shipInfo.classList.add("ship-info");

    const shipName = document.createElement("h3");
    shipName.textContent = this.squad[0].type;
    shipInfo.appendChild(shipName);
    const rotateButton = document.createElement("button");
    rotateButton.classList.add("rotate-button");
    rotateButton.textContent = "Rotate";
    shipInfo.appendChild(rotateButton);
    placementScreen.appendChild(shipInfo);
  },

  placeShipListeners() {
    const placementScreen = document.querySelector(".placing");

    placementScreen.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("cell"))
        this.handleCellMouseOver(e.target);
    });

    placementScreen.addEventListener("mouseout", this.handleCellMouseOut);

    placementScreen.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell"))
        this.handleCellMouseClick(e.target);
    });
  },

  placeEventListener(playerName) {
    const board = document.querySelector(playerName);
    board.addEventListener("click", (e) => {
      const attackedPosition = Number(e.target.getAttribute("data-index"));
      if (!e.target.classList.contains("cell")) return;
      if (someBoard.board[attackedPosition].attacked === true) return;
      if (player.isTurn === false && playerName === ".human") return;
      const attackStatus = someBoard.receiveAttack(attackedPosition);

      this.handleAttack(attackedPosition, attackStatus);
      if (someBoard.checkIfAllSunk() === true) this.finishGame(); 
    });
  },

  checkIfValid(element) {
    const attackedPosition = element.target.getAttribute("data-index");
    if (!element.target.classList.contains("cell")) return;
    if (someBoard.board[attackedPosition].attacked === true) return;
    const attackStatus = someBoard.receiveAttack(attackedPosition);
    this.handleAttack(attackedPosition, attackStatus);
    return true;
  },

  handleAttack(position, status) {
    const cell = document.querySelector(`.${playerName} > .row >
    [data-index="${position}"]`);
    if (status === "miss") {
      cell.classList.add("miss");
    } else {
      cell.classList.add("hit");
    }
  },

  changeShipDirection() {
    document.querySelector(".rotate-button").addEventListener("click", () => {
      const mySquad = this.squad;

      if (mySquad[0].direction === "horizontal") {
        mySquad[0].direction = "vertical";
        this._squad = mySquad;
        return;
      }

      mySquad[0].direction = "horizontal";
    });
  },

  handleCellMouseOver(cell) {
    const row = cell.parentElement;
    const currentIndex = Number(cell.getAttribute("data-index"));
    const ships = this.squad;
    const currentShip = ships[0];
    const placedIndexes = [];
    placedIndexes.push(currentIndex);
    cell.classList.add("highlighted");


    if (currentShip.direction === "horizontal") {
      for (let i = 1; i < currentShip.size; i++) {
        if (currentIndex + i > 99) return false;
        const nextCell = document.querySelector(`.place-ship > .row >
        [data-index="${currentIndex + i}"]`);
        if (
          nextCell.classList.contains("placed") ||
          cell.classList.contains("placed")
        )
          return false;
        if (!row.contains(nextCell)) return false;
        nextCell.classList.add("highlighted");
        placedIndexes.push(currentIndex + i);
      }

      return placedIndexes;
    }

    let offset = 10;
    for (let i = 1; i < currentShip.size; i++) {
      if (currentIndex + offset > 99) return false;
      const nextCell = document.querySelector(`.place-ship > .row >
        [data-index="${currentIndex + offset}"]`);
      if (
        nextCell.classList.contains("placed") ||
        cell.classList.contains("placed")
      )
        return false;
      nextCell.classList.add("highlighted");
      placedIndexes.push(currentIndex + offset);
      offset += 10;
    }

    return placedIndexes;
  },

  placeShip(shipIndexes) {
    for (const i of shipIndexes) {
      document
        .querySelector(`.place-ship > .row > [data-index="${i}"]`)
        .classList.add("placed");
      document.querySelector(`[data-index="${i}"]`).classList.add("placed");
    }
  },

  handleCellMouseOut() {
    const cells = document.querySelectorAll(".highlighted");
    cells.forEach((cell) => cell.classList.remove("highlighted"));
  },

  handleCellMouseClick(validShip) {
    const shipIndexes = this.handleCellMouseOver(validShip);
    if (shipIndexes === false) return;

    someBoard.updateBoard(this.squad[0].type, shipIndexes);
    this.placeShip(shipIndexes);
    const mySquad = this.squad.slice(1);
    this.squad = mySquad;

    if (this.squad.length === 0) {
      this.endPlacementPhase();
      return;
    }

    const shipName = document.querySelector(".ship-info > h3");
    shipName.textContent = this.squad[0].type;
  },

  endPlacementPhase() {
    document.querySelector(".page-wrapper").classList.remove("blurring");
    document.querySelector(".placing").remove();
    const boards = document.querySelector(".boards");
    boards.style.display = "grid";
  },

  finishGame() {
    const finishScreen = document.createElement("div");
    finishScreen.classList.add("game-over");
    document.querySelector("body").appendChild(finishScreen);
    document.querySelector(".page-wrapper").classList.add("blurring");
    const phrase = document.createElement("h3");
    finishScreen.appendChild(phrase);

    if (playerName === "human") {
      phrase.textContent = "You lost the game!";
    }
    else phrase.textContent = "You won the game!";
    
    const closeWindow = document.createElement("button");
    closeWindow.classList.add("close-window");
    closeWindow.textContent = "Close";
    finishScreen.appendChild(closeWindow);
    this.closeButton();
  },

  closeButton() {
    document.querySelector(".close-window").addEventListener("click", () => {
      document.querySelector(".page-wrapper").classList.remove("blurring");
      document.querySelector(".game-over").remove();
    });
  }
});
