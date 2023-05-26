import { player } from "./player";

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

  set board(newBoard) {
    this._board = newBoard;
  },

  updateBoard(shipType, indexes) {
    const myBoard = this.board;
    for (const i of indexes) {
      myBoard[i].ship = shipType;
    }

    this.board = myBoard;
  },

  receiveAttack(position) {
    this._board[position].attacked = true;
    if (this._board[position].ship === "none") return "miss";

    return "hit";
  },

  checkIfAllSunk() {
    const myBoard = this._board.filter((cell) => cell.stillAlive === true);
    if (myBoard.length === 0) return true;
    return false;
  },

  cellsNotAttacked() {
    return this._board.filter((cell) => cell.attacked === false);
  },
});
