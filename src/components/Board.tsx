import React from "react";
import { JsxElement } from "typescript";

function Board() {
  let rows = [];

  for (let y = 0; y < 3; y++) {
    rows.push(<tr key={y}>{Row(y)}</tr>);
  }

  return (
    <div className="Board">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function Row(y: number) {
  let content = [];

  for (let x = 0; x < 5; x++) {
    content.push(
      <td key={`${x},${y}`} onClick={() => handleClick(x, y)}>
        {Tile()}
      </td>
    );
  }

  return content;
}

function Tile() {
  return <div className="Tile">Tile</div>;
}

function handleClick(x: number, y: number) {
  console.log(`clicked on tile ${x},${y}`);
}

export default Board;
