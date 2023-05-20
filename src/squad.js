import { ship } from "./ship.js";

export const shipSquad = () => ({
  create() {
    const ships = [];
    
    const carrier = ship('carrier', 5);
    ships.push(carrier);

    const battleship = ship('battleship', 4);
    ships.push(battleship);

    const destroyer = ship('destroyer', 3);
    ships.push(destroyer);

    const submarine = ship('submarine', 3);
    ships.push(submarine);

    const boat = ship('boat', 2);
    ships.push(boat);

    return ships;
  }
});