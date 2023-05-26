import './styles.css'
import {game} from './gameloop.js';
import { gameBoard } from "./createboard.js";
import { domBoard } from "./domboard.js";


const gameStart = game();
gameStart.createGameLoop();
