export const ship = (shipType, shipSize) => ({
  type: shipType,
  
  size: shipSize,

  direction: 'horizontal',

  hits: 0,

  hit() {
    this.hits++;
  },

  isSunk() {
    if (this.size > this.hits) return false;
    return true;
  },
});
