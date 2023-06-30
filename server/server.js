"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var buildSchema = require("graphql").buildSchema;
var GameState = /** @class */ (function () {
    function GameState(game) {
        if (game === void 0) { game = new Game_1.Game(8, 0); }
        this.game = game;
    }
    return GameState;
}());
// Construct a schema, using GraphQL schema language
var schema = buildSchema("\n  type Query {\n    hello: String\n    results(gameId: String): GameState\n  }\n  type Mutation {\n    start: GameState\n    move(gameId: String, x: Int, y: Int): GameState\n  }\n  type GameState {\n    id: String\n    game: Game\n  }\n  type Game {\n    guessesRemaining: Int\n    fruits: Int\n    board: Board\n  }\n  type Board {\n    tiles: [Tile!]!\n  }\n  type Tile {\n    isSelected: Boolean\n    value: Value\n  }\n  union Value = Fruit | Junk\n  type Fruit {\n    name: String\n  }\n  type Junk {\n    name: String\n  }\n");
// The root provides a resolver function for each API endpoint
var root = {
    hello: function () {
        return "Hello DAVID!";
    },
    start: function () {
        var oldState = new GameState();
        var tiles = oldState.game.board.tiles.map(function (tile) { return new Game_1.Tile(tile.isSelected, null); });
        return new GameState(new Game_1.Game(oldState.game.guessesRemaining, oldState.game.fruits, new Game_1.Board(tiles)));
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
