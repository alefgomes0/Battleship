import {game} from './gameloop.js';
import "./styles.css";


const start = game();
start.createGameLoop();

const computerBoard = document.querySelector(".computer");
computerBoard.addEventListener("click",(e) => {
  if (e.target.classList.contains("attacked")) return;
  start.computerRound();
  e.target.classList.add("attacked");
});
