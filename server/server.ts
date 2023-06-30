import { Game, Tile, Board, Fruit, Junk } from "./Game"

var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

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
  union Value = Fruit | Junk
  type Fruit {
    name: String
  }
  type Junk {
    name: String
  }
`)

var gameState = new GameState()
console.log(gameState)
console.log(gameState.game.board.tiles[6])

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello DAVID!"
  },
  start: () => {
    return gameState
  },

  move: (gameId: string, position: number) => {
    console.log(position)
    console.log(gameState.game.board.tiles[position])
    gameState.game.board.tiles[position].isSelected = true
    gameState.game.board.tiles[position].value = new Fruit()
    gameState = new GameState(new Game(gameState.game.guessesRemaining,  gameState.game.fruits, new Board(gameState.game.board.tiles)));
    return gameState
  }
}

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")