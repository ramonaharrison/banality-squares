import { Game, Tile, Board } from "./Game"

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
    move(gameId: String, x: Int, y: Int): GameState
  }
  type GameState {
    id: String
    game: Game
  }
  type Game {
    
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello DAVID!"
  },
  start: () => {
    let oldState = new GameState()
    let tiles: Tile[] = oldState.game.board.tiles.map<Tile>((tile)=> new Tile(tile.isSelected, null))
    return new GameState(new Game(oldState.game.guessesRemaining,  oldState.game.fruits, new Board(tiles)));
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