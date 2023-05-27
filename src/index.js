import { domBoard } from "./domboard.js";
import {game} from './gameloop.js';
import { gameBoard } from "./createboard.js";
import './styles.css'



const humanBoard = gameBoard("human")
humanBoard.createBoardCoordinates();
const computerBoard = gameBoard("computer")
computerBoard.createBoardCoordinates();
const humanDOMBoard = domBoard("human", humanBoard);
const computerDOMBoard  = domBoard("computer", computerBoard);

const gameStart = game(humanBoard, computerBoard, humanDOMBoard, computerDOMBoard);
gameStart.createGameLoop();

document.querySelector(".computer").addEventListener("click", (e) => {
  if (computerDOMBoard.checkIfValid(e) !== true) return;
  gameStart.computerRound();
})