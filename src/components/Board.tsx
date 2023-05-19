import React from "react";
import { JsxElement } from "typescript";

function Board() {
  return (
    <div className="Board">
      <table>{Row()}</table>
    </div>
  );
}

function Tile() {
  return <div className="Tile">Tile</div>;
}

function Row() {
  let content = [];

  for (let index = 0; index < 5; index++) {
    content.push(<td>{Tile()}</td>);
  }

  return (
    <div className="Row">
      <tr>{content}</tr>
    </div>
  );
}

export default Board;
