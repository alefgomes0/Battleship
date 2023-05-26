import { ship } from "./ship.js";

export const shipSquad = () => ({
  create() {
    const ships = [];

    const carrier = ship("Carrier", 5);
    ships.push(carrier);

    const battleship = ship("Battleship", 4);
    ships.push(battleship);

    const destroyer = ship("Destroyer", 3);
    ships.push(destroyer);

    const submarine = ship("Submarine", 3);
    ships.push(submarine);

    const boat = ship("Boat", 2);
    ships.push(boat);

    return ships;
  },
});
