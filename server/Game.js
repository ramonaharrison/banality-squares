"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = exports.Board = exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(guessesRemaining, fruits, board) {
        if (guessesRemaining === void 0) { guessesRemaining = 8; }
        if (fruits === void 0) { fruits = 0; }
        if (board === void 0) { board = new Board(); }
        this.guessesRemaining = guessesRemaining;
        this.fruits = fruits;
        this.board = board;
    }
    Game.prototype.getPrize = function () {
        return new Prize();
    };
    Object.defineProperty(Game.prototype, "setFruits", {
        set: function (number) {
            this.fruits = number;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
var Board = /** @class */ (function () {
    function Board(tiles) {
        if (tiles === void 0) { tiles = [new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile(), new Tile()]; }
        this.tiles = tiles;
    }
    return Board;
}());
exports.Board = Board;
var Tile = /** @class */ (function () {
    function Tile(isSelected, value) {
        if (isSelected === void 0) { isSelected = false; }
        if (value === void 0) { value = null; }
        this.isSelected = false;
        this.value = null;
        isSelected = false;
        value = value;
    }
    return Tile;
}());
exports.Tile = Tile;
var Prize = /** @class */ (function () {
    function Prize() {
    }
    return Prize;
}());
function randomFruitOrJunk() {
    var thing;
    if (Math.floor(Math.random() * 10) % 2 === 0) {
        thing = new Fruit();
    }
    else {
        thing = new Junk();
    }
    return thing;
}
var Fruit = /** @class */ (function () {
    function Fruit() {
        this.name = "fruit";
    }
    return Fruit;
}());
var Junk = /** @class */ (function () {
    function Junk() {
        this.name = "junk";
    }
    return Junk;
}());
var game = new Game(8, 0);
console.log("fruit count ".concat(game.fruits));
for (var i = 0; i < 10; i++) {
    var thing = randomFruitOrJunk();
    console.log("fruit or junk: ".concat(thing.name));
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
