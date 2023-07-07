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
