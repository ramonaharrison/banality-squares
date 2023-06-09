import Game from "./Game"

var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

class GameState {
  game: Game = new Game(8, 0)
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
`)

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello DAVID!"
  },
  start: () => {
    return GameState
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