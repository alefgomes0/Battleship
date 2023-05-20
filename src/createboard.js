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

    this._board = coordinates;
  },

  get board() {
    return this._board;
  },

  receiveAttack(position) {
    if (this._board[position].ship === "none") {
      console.log("You missed!");
      this._board[position].attacked = true;
    } else {
      console.log("You hit!");
      // usar na instância adequada do navio que foi acertado, pra
      // poder usar "boat.hit()" por exemplo. provavelmente só vou
      // invocar essa função no "index.js" ou algo assim
    }
  },

  checkIfAllSunk() {
    const myBoard = this._board.filter((cell) => cell.stillAlive === true);
    if (myBoard.length === 0) return true;
    return false;
  },

  cellsNotAttacked() {
    return this._board.filter(cell => cell.attacked === false);
  }
});
