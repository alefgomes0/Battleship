import './styles.css'
import {game} from './gameloop.js';


const gameStart = game();
gameStart.createGameLoop();

const computerBoard = document.querySelector(".computer");
computerBoard.addEventListener("click",(e) => {
  if (e.target.classList.contains("attacked")) return;
  gameStart.computerRound();
  e.target.classList.add("attacked");
});