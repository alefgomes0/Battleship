import { ship } from "./ship";

export const gameBoard = (playerShips) => ({
  _ships: playerShips,

  get ships() {
    return this._ships;
  },

  set ships(array) {
    this._ships = array;
  },


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

    const shipName = this._board[position].ship;
    this.attackShip(shipName);
    return "hit";
  },


  attackShip(shipName) {
    const updatedShips = this.ships;
    const shipIndex = updatedShips.findIndex((ship) => ship.type === shipName)
    updatedShips[shipIndex].hit();
    this.ships = updatedShips;
  },

  checkIfAllSunk() {
    const myShips = this.ships.filter((ship) => ship.isSunk() === false) 
    if (myShips.length === 0) return true;
    return false;
  },

});
