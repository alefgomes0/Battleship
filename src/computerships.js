export const placeComputerShips = (ships, board) => ({
  get shipIndexes() {
    return this._shipIndexes;
  },

  set shipIndexes(array) {
    this._shipIndexes = array || [];
  },

  get myShips() {
    return this._myShips;
  },

  set myShips(list) {
    this._myShips = list;
  },

  idk() {
    this.myShips = ships;
  },

  vsf() {
    this.shipIndexes = [];
  },

  mergeSort(array, start = 0, end = array.length - 1) {
    if (start >= end) return [array[start]];
    
    const midpoint = Math.floor((start + end) / 2);
    const left = this.mergeSort(array, start, midpoint);
    const right = this.mergeSort(array, midpoint + 1, end);
  
    return this.merge(left, right);
  },


  merge(left, right) {
    const sortedList = [];
  
    let i = 0;
    let j = 0;
  
    while (i < left.length || j < right.length) {
      if (i >= left.length || (j < right.length && right[j] < left[i])) {
        sortedList.push(right[j]);
        j++;
      }
      else {
        sortedList.push(left[i]);
        i++;
      }
    }
  
    return sortedList;
  },


  iterativeBinarySearch(list, searchedNumber) {
    let start = 0;
    let end = list.length;
    let middle;
  
    while (start <= end) {
      middle = Math.floor((start + end) / 2);
  
      if (list[middle] === searchedNumber) return true;

      if(list[middle] > searchedNumber) {
        end = middle - 1;
      }
      else start = middle + 1;
    }

    return false;
  },


  definePosition() {
    let position;
    const decidePosition = Math.floor(Math.random() * 100);
    if (decidePosition <= 50) position = "horizontal";
    else position = "vertical";

    return position;
  },


  checkIfRepeated(array) {
    const temp = this.shipIndexes;
    this.shipIndexes = this.mergeSort(temp);
      
    const found = [];
    for (const i of array) {
      found.push(this.iterativeBinarySearch(this.shipIndexes, i));
    }

    for (const s of found) {
      if (s === true) return true;
    }

    return false;
  },


  placeShips() {
    while(this.myShips.length !== 0) {
      const position = this.definePosition();
      if (position === "horizontal") this.placeHorizontalShip();
      else this.placeVerticalShip();
    }
  },


  placeHorizontalShip() {
    while (true) {
      const firstIndex = Math.floor(Math.random() * 100);
      const shipSize = this.myShips[0].size - 1;
      const lastIndex = firstIndex + shipSize;
      if (lastIndex > 99) continue;
      
      const cell = document.querySelector(
        `.row > [data-index="${firstIndex}"]`
      );
      const row = cell.parentElement;
      const lastCell = document.querySelector(
        `.row > [data-index="${lastIndex}"]`
      );
      if (!row.contains(lastCell)) continue;

      const provisoryPlacement = [];
      for (let i = firstIndex; i <= lastIndex; i++) {
        provisoryPlacement.push(i);
      }

      const repeatedNumber = this.checkIfRepeated(provisoryPlacement);
      if (repeatedNumber === true) continue;

      for (const n of provisoryPlacement) this.shipIndexes.push(n);
      console.log(provisoryPlacement, this.myShips)
      board.updateBoard(this.myShips[0].type, provisoryPlacement);
      const replacementShips = this.myShips;
      replacementShips.splice(0, 1);
      this.myShips = replacementShips;
      break;
    }
  },

  placeVerticalShip() {
    while(true) {
      const firstIndex = Math.floor(Math.random() * 100);
      const shipSize = this.myShips[0].size - 1;
      let offset = 10;
      const lastIndex = firstIndex + (shipSize * offset);
      const provisoryPlacement = [];

      if (lastIndex > 99) continue
      provisoryPlacement.push(firstIndex);
  
      for (let i = 1; i < this.myShips[0].size; i++) {
        provisoryPlacement.push(firstIndex + offset);
        offset += 10;
      }

      const repeatedNumber = this.checkIfRepeated(provisoryPlacement);
      if (repeatedNumber === true) continue;

      for (const n of provisoryPlacement) this.shipIndexes.push(n);
      
      console.log(provisoryPlacement, this.myShips)
      board.updateBoard(this.myShips[0].type, provisoryPlacement);
      const replacementShips = this.myShips;
      replacementShips.splice(0, 1);
      this.myShips = replacementShips;
      break;
    }
  },
});
