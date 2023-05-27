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

  recentHit: false,

  cellsToTry: [],

  roundsWithoutHits: 99,

  findIndex(nextGuesses) {
    for (let i = 0; i < nextGuesses.length; i++) {
      let cell = this.availableCells.filter((cell) => cell === nextGuesses[i]);
      if (cell !== -1) return cell;
    }
  },

  random() {
    let index;
    const cells = this.availableCells;

    if (this.recentHit === true) {
      index = this.findIndex(this.cellsToTry);
    }
    else {
    index = Math.floor(Math.random() * cells.length);
    }

    cells.splice(index, 1);
    this.availableCells = cells;

    this.smart(index);
    return index;
  },

  smart(index) {
    index = Number(index);
    if (opponentBoard.board[index].ship !== "none") {
      this.recentHit = true;
      this.roundsWithoutHits = 0;

      let testCells = [index - 1, index + 1, index - 10, index + 10];
      testCells = this.validateCells(testCells);
      this.cellsToTry = testCells;
    }

    if (this.recentHit === true && opponentBoard.board[index].ship === "none") {
      const updatedList = this.cellsToTry;
      updatedList.splice(0, 1);
      console.log("AAAAA", updatedList);

      this.roundsWithoutHits++;
    }
  },

  validateCells(list) {
    const newList = [];
    for (const i of list) {
      if (i < 0 || i > 99) continue;
      newList.push(i);
    }

    return newList;

    // arrumar um jeito de tirar as celulas que não estejam disponiveis
    // no this.availableCells
  }
});
