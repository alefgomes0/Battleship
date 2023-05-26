export const computerAttack = (opponentBoard) => ({
  checkAvailableCells() {
    const notAttacked = [];
    let counter = 0;
    for (const s of opponentBoard.board) {
      counter++;
      if (s.attacked === true) continue;
      notAttacked.push(counter);
    }

    this._availableCells = notAttacked;
  },

  get availableCells() {
    return this._availableCells;
  },

  set availableCells(value) {
    this._availableCells = value;
  },

  random() {
    const cells = this.availableCells;
    const randomIndex = Math.floor(Math.random() * cells.length);
    cells.splice(randomIndex, 1);
    this.availableCells = cells;
    console.log(this.availableCells);

    return randomIndex;
  },
});
