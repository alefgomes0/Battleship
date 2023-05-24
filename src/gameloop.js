import { gameBoard } from "./createboard.js";
import { player } from "./player.js";
import { domBoard } from "./domboard.js";

export function createGameLoop() {
  const humanPlayer = player();
  const computerPlayer = player();

  const humanBoard = gameBoard("human");
  humanBoard.createBoardCoordinates();
  const computerBoard = gameBoard("computer");
  computerBoard.createBoardCoordinates();

  const humanDOMBoard = domBoard("human", humanBoard);
  const computerDOMBoard = domBoard("computer", computerBoard);

  let placementOver = false;

  function startPlacementPhase() {
    humanDOMBoard.createPlacementUI();
    humanDOMBoard.placeShipListeners();
    humanDOMBoard.changeShipDirection();
  }

  startPlacementPhase();

  function startGame() {
    humanPlayer.isTurn = true;
    computerPlayer.isComputer = true;
    humanDOMBoard.displayBoard();
    computerDOMBoard.displayBoard();
  }

  startGame();

  // playRound()
  // pensei em checar se humanPlayer.isTurn é verdadeiro
  // se sim, adicionar event listeners nas cells do tabuleiro
  // do computador. quando o jogador clicar numa cell valida,
  // tirar todos os event listeners e mudar humanPlayer.isTurn
  // pra falso

  function playRound() {
    if (humanPlayer.isTurn !== true) return;
    computerDOMBoard.placeEventListener(".computer");
  }

  playRound();
}
