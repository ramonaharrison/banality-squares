"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var buildSchema = require("graphql").buildSchema;
var GameState = /** @class */ (function () {
    function GameState() {
        this.game = new Game_1.default(8, 0);
    }
    return GameState;
}());
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n    results(gameId: String): GameState\n  }\n  type Mutation {\n    start: GameState\n    move(gameId: String, x: Int, y: Int): GameState\n  }\n  type GameState {\n    id: String\n  }\n  \n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return "Hello DAVID!";
    },
    start: function () {
        return GameState;
    }
};
var app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
