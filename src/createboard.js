export const gameBoard = (playerName) => ({
  createBoardCoordinates() {
    const coordinates = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        coordinates.push({
          coordinate: `${i},${j}`,
          ship: "none",
          attacked: false,
        });
      }
    }

    sessionStorage.setItem(`${playerName}Board`, JSON.stringify(coordinates));
  },

  get board() {
    return JSON.parse(sessionStorage.getItem(`${playerName}Board`)) || [];
  },

  placeShips(someShip, positions) {
    const myBoard = this.board;
    for (const i of positions) {
      myBoard[i].ship = someShip.type;
      myBoard[i].stillAlive = true;
    }

    sessionStorage.setItem(`${playerName}Board`, JSON.stringify(myBoard));
  },

  receiveAttack(position) {
    if (this.board[position].ship === "none") {
      console.log("You missed!");
      this.board[position].attacked = true;
    } else {
      console.log("You hit!");
      // usar na instância adequada do navio que foi acertado, pra
      // poder usar "boat.hit()" por exemplo. provavelmente só vou
      // invocar essa função no "index.js" ou algo assim
    }
  },

  checkIfAllSunk() {
    const myBoard = this.board.filter((cell) => cell.stillAlive === true);
    if (myBoard.length === 0) return true;
    return false;
  },

  cellsNotAttacked() {
    return this.board.filter(cell => cell.attacked === false);
  }
});
