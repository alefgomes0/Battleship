export const player = () => ({
  _isTurn: false,
  _isComputer: false,

  get isTurn() {
    return this._isTurn;
  },

  set isTurn(value) {
    this._isTurn = value;
  },

  get isComputer() {
    return this._isComputer;
  },

  set isComputer(value) {
    this._isComputer = value;
  },

  computerPlay(opponenBoard) {
    if (this.isComputer === false) return;
    const availableCells = opponenBoard.filter(
      (cell) => cell.attacked === false
    );
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomNumber = availableCells[randomIndex];
    console.log(randomNumber);
  },
});
