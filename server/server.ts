import { Game, Tile, Board, Fruit, Junk } from "./Game";

var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

class GameState {
  game: Game;

  constructor(game: Game = new Game(8, 0)) {
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
  interface Value {
    name: String!
  }
  type Fruit implements Value {
    name: String!
  }
  type Junk implements Value {
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

  Value: {
    __resolveType: (obj, contextValue, info) => {
      if (obj.name === "fruit") {
        return "Fruit";
      } else {
        return "Junk";
      }
    },
  },
  move: ({ gameId, position }: { gameId: string; position: number }) => {
    {
      gameState.game.board.tiles[position].isSelected = true;
      const newLocal = new Fruit();
      console.log(`fruit = ${newLocal.name}`);
      gameState.game.board.tiles[position].value = newLocal;
      gameState = new GameState(
        new Game(
          gameState.game.guessesRemaining,
          gameState.game.fruits,
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
