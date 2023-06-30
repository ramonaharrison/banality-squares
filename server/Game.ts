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
  value?: Fruit | Junk | null = null;
  
  constructor(isSelected: Boolean = false, value:  Fruit | Junk | null = null){
    isSelected = false;
    value = value;
  }
}

class Prize {}

function randomFruitOrJunk(): Fruit | Junk {
  let thing: Fruit | Junk;
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    thing = new Fruit();
  } else {
    thing = new Junk();
  }
  return thing;
}

export class Fruit {
  name: string = "fruit";
}

export class Junk {
  name: string = "junk";
}

let game = new Game(8, 0);

console.log(`fruit count ${game.fruits}`);
for (let i = 0; i < 10; i++) {
  let thing = randomFruitOrJunk();
  console.log(`fruit or junk: ${thing.name}`);
}
//export default Game;

/*
Game:
- guessesRemaining: Number
- fruits: Number
- prize: Prize
- board: Board
Board:
- array: Tile[][]
Tile:
- isSelected
- value: Fruit | Junk
*/
