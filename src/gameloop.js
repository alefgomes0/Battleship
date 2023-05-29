import { domBoard } from "./domboard.js";
import { gameBoard } from "./createboard.js";
import { player } from "./player.js";
import { shipSquad } from "./squad.js";
import { placeComputerShips } from "./computerships.js";
import { computerAttack } from "./computerattack.js";

export const game = () => ({
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
    this.humanBoard = gameBoard(shipSquad().create());
    this.humanBoard.createBoardCoordinates();
    this.computerBoard = gameBoard(shipSquad().create());
    this.computerBoard.createBoardCoordinates();
    this.humanDOMBoard = domBoard("human", this.humanBoard, this.humanPlayer);
    this.computerDOMBoard = domBoard(
      "computer",
      this.computerBoard,
      this.computerPlayer
    );
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
    this.humanPlayer.isTurn = false;
    this.computerPlayer.isComputer = true;
    const computerShips = placeComputerShips(
      shipSquad().create(),
      this.computerBoard
    );

    computerShips.placeShips();
    this.humanDOMBoard.displayBoard();
    this.computerDOMBoard.displayBoard();
    this.computerDOMBoard.placeEventListener(".computer");
    this.humanDOMBoard.placeEventListener(".human");
  },

  computerRound() {
    this.humanPlayer.isTurn = true;
    const cellNumber = this.computerPlay.attack();
    const attackedCell = document.querySelector(
      `.human > .row > [data-index="${cellNumber}"]`
    );
    attackedCell.click();
    this.humanPlayer.isTurn = false;
  },
});
