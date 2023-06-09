class Game {
  guessesRemaining: number = 8;
  fruits: number = 0;
  board: Board = new Board();

  constructor(guessesRemaining: number, fruits: number) {
    this.guessesRemaining = guessesRemaining;
    this.fruits = fruits;
  }

  getPrize(): Prize {
    return new Prize();
  }

  set setFruits(number: number) {
    this.fruits = number;
  }
}

class Board {
  tiles: Tile[][] = [[], [], []];
}

class Tile {
  isSelected: boolean = false;
  value: Fruit | Junk = randomFruitOrJunk();
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

class Fruit {
  name: string = "fruit";
}

class Junk {
  name: string = "junk";
}

let game = new Game(8, 0);

console.log(`fruit count ${game.fruits}`);
for (let i = 0; i < 10; i++) {
  let thing = randomFruitOrJunk();
  console.log(`fruit or junk: ${thing.name}`);
}
export default Game;

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
