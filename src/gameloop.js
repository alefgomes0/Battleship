import { ship } from "./ship.js";
import { gameBoard } from "./createboard.js";
import { player } from "./player.js";
import { domBoard } from "./domboard.js";

export const gameLoop = () => ({
  humanPlayer: player(),

  computerPlayer: player(),

  humanBoard: gameBoard("human"),

  computerBoard: gameBoard("computer"),

  humanDOMBoard: domBoard("human", this.humanBoard),

  computerDOMBoard: domBoard("computer", this.computerBoard),

  startGame() {
    this.humanPlayer.isTurn(true);
    this.computerPlayer.isComputer(true);
    this.humanDOMBoard.displayBoard();
    this.computerDOMBoard.displayBoard();
  },
});

