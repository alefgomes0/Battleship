import { player } from "./player.js";
import { shipSquad } from "./squad.js";
import { placeComputerShips } from "./computerships.js";
import { computerAttack } from "./computerattack.js";

export const game = (humanBoard, computerBoard, humanDOMBoard, computerDOMBoard) => ({
  humanPlayer: null,
  computerPlayer: null,
  humanBoard: null,
  computerBoard: null,
  humanDOMBoard: null,
  computerDOMBoard: null,
  computerPlay: null,

  createGameLoop() {
    this.humanPlayer = player();
    this.computerPlayer = player();
    this.humanBoard = humanBoard;
    this.computerBoard = computerBoard;
    this.humanDOMBoard = humanDOMBoard;
    this.computerDOMBoard = computerDOMBoard;
    this.computerPlay = computerAttack(this.humanBoard);
    this.computerPlay.checkAvailableCells();

    this.startPlacementPhase();
    this.startGame();
  },

  startPlacementPhase() {
    this.humanDOMBoard.createPlacementUI();
    this.humanDOMBoard.placeShipListeners();
    this.humanDOMBoard.changeShipDirection();
  },

  startGame() {
    this.humanPlayer.isTurn = true;
    this.computerPlayer.isComputer = true;
    const computerSquad = shipSquad().create();
    const computerShips = placeComputerShips(computerSquad, this.computerBoard);

    computerShips.placeShips();
    this.humanDOMBoard.displayBoard();
    this.computerDOMBoard.displayBoard();
  },

  humanRound() {
    this.computerDOMBoard.placeEventListener(".computer");
  },

  computerRound() {
    const cellNumber = this.computerPlay.random();
    const attackedCell = document.querySelector(
      `.human > .row > [data-index="${cellNumber}"]`
    );
    this.humanDOMBoard.placeEventListener(".human");
    attackedCell.click();
    this.humanPlayer.isTurn = true;
    this.humanRound();
  },
});
