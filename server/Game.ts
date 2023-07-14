export class Game {
  guessesRemaining: number;

  board: Board;

  constructor(guessesRemaining: number = 8, board: Board = new Board()) {
    this.guessesRemaining = guessesRemaining;
    this.board = board;
  }

  getPrize(): Prize {
    return new Prize();
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

export function randomFruitOrJunk(): Value {
  let value: Value;
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    value = new Fruit();
  } else {
    value = new Junk();
  }
  return value;
}

export class Fruit implements Value {
  name: string = "fruit";
  get __typename() {
    return 'Fruit'
  }
}

export class Junk implements Value {
  name: string = "junk";
  get __typename() {
    return 'Junk'
  }
}

export interface Value {
  name: string
}
