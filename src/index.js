import './styles.css'
import {game} from './gameloop.js';


const gameStart = game();
gameStart.createGameLoop();

const computerBoard = document.querySelector(".computer");
computerBoard.addEventListener("click",() => {
  gameStart.computerRound();
});