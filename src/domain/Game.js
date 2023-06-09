"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(guessesRemaining, fruits) {
        this.guessesRemaining = 8;
        this.fruits = 0;
        this.board = new Board();
        this.guessesRemaining = guessesRemaining;
        this.fruits = fruits;
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
var Board = /** @class */ (function () {
    function Board() {
        this.tiles = [[], [], []];
    }
    return Board;
}());
var Tile = /** @class */ (function () {
    function Tile() {
        this.isSelected = false;
        this.value = randomFruitOrJunk();
    }
    return Tile;
}());
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
exports.default = Game;
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
