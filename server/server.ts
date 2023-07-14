import { Game, Tile, Board, Fruit, Junk, randomFruitOrJunk} from "./Game";

var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

class GameState {
  game: Game;

  constructor(game: Game = new Game(8)) {
    this.game = game;
  }
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    results(gameId: String): GameState
  }
  type Mutation {
    start: GameState
    move(gameId: String, position: Int): GameState
  }
  type GameState {
    id: String
    game: Game
  }
  type Game {
    guessesRemaining: Int
    fruits: Int
    board: Board
  }
  type Board {
    tiles: [Tile!]!
  }
  type Tile {
    isSelected: Boolean
    value: Value
  }
  union Value = Fruit | Junk

  type Fruit {
    name: String!
  }
  type Junk{
    name: String!
  }
`);

var gameState = new GameState();

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello DAVID!";
  },
  start: () => {
    return gameState;
  },

  move: ({ gameId, position }: { gameId: string; position: number }) => {
    {
      gameState.game.board.tiles[position].isSelected = true;
      const newLocal = randomFruitOrJunk();
      console.log(`fruit = ${newLocal.name}`);
      gameState.game.board.tiles[position].value = newLocal;
      gameState = new GameState(
        new Game(
          gameState.game.guessesRemaining,
          new Board(gameState.game.board.tiles)
        )
      );
      return gameState;
    }
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
