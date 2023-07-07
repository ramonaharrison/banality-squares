export class Game {
  guessesRemaining: number;
  fruits: number;
  board: Board;

  constructor(guessesRemaining: number = 8, fruits: number = 0, board: Board = new Board()) {
    this.guessesRemaining = guessesRemaining;
    this.fruits = fruits;
    this.board = board;
  }

  getPrize(): Prize {
    return new Prize();
  }

  set setFruits(number: number) {
    this.fruits = number;
  }
}

export class Board {
  tiles: Tile[];

  constructor(tiles: Tile[] = [new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile()]) {
    this.tiles = tiles;
  }
}

export class Tile {
  isSelected: boolean = false;
  value?: Value | null = null;
  
  constructor(isSelected: Boolean = false, value:  Value | null = null){
    isSelected = false;
    value = value;
  }
}

class Prize {}

function randomFruitOrJunk(): Value {
  let thing: Value;
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    thing = new Fruit();
  } else {
    thing = new Junk();
  }
  return thing;
}

export class Fruit implements Value {
  name: string = "fruit";
}

export class Junk implements Value {
  name: string = "junk";
}

export interface Value {
  name: string
}
