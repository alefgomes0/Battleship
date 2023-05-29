export const computerAttack = (opponentBoard) => ({
  checkAvailableCells() {
    const notAttacked = [];
    let counter = 0;

    for (const s of opponentBoard.board) {
      if (s.attacked === true) continue;
      notAttacked.push(counter);
      counter++;
    }

    this._availableCells = notAttacked;
  },

  get availableCells() {
    return this._availableCells;
  },

  set availableCells(value) {
    this._availableCells = value;
  },

  recentHit: false,

  recentHitIndex: null,

  roundsWithoutHits: 0,

  cellsToAttack: [],

  checkMiss() {
    this.roundsWithoutHits++;
    if (this.roundsWithoutHits >= 4) this.recentHit = false;
  },

  findIndex(nextGuess) {
    const cells = this.availableCells;
    return cells.findIndex((cell) => cell === nextGuess)
  },

  attack() {
    let attackedCell;
    if (this.recentHit === true) {
      attackedCell = this.smart();
    } else attackedCell = this.random();

    this.checkHit(attackedCell);
    const cells = this.availableCells;
    const index = cells.findIndex((cell) => cell === attackedCell);
    cells.splice(index, 1);
    this.availableCells = cells;
    return attackedCell;
  },

  checkHit(someIndex) {
    if (opponentBoard.board[someIndex].ship === "none") {
      this.recentHit = false;
      this.checkMiss();
    } else {
      this.recentHit = true;
      this.recentHitIndex = someIndex;
      this.roundsWithoutHits = 0;
    }
  },

  random() {
    const cells = this.availableCells;
    const index = this.randomize(cells);
    return cells[index];
  },

  smart() {
    const index = this.recentHitIndex;

    const testCells = [index - 1, index + 1, index - 10, index + 10];
    const nextTargets = this.validateCells(testCells);

    if (nextTargets.length > 0) {
      this.cellsToAttack = nextTargets;
      const smartAttack = this.randomize(nextTargets);
      return nextTargets[smartAttack];
    }

    return this.random();
  },

  randomize(array) {
    return Math.floor(Math.random() * array.length);
  },

  validateCells(list) {
    const newList = [];
    for (const i of list) {
      if (i < 0 || i > 99) continue;
      if (opponentBoard.board[i].attacked === true) continue;
      newList.push(i);
    }

    return newList;
  },
});
