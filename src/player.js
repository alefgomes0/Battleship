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
});
