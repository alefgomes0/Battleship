import './styles.css'
import {gameLoop} from './gameloop.js';
import { gameBoard } from "./createboard.js";
import { domBoard } from "./domboard.js";


const board = gameBoard();
board.createBoardCoordinates();
const myDOMBoard = domBoard('human', board);
myDOMBoard.placeShips();