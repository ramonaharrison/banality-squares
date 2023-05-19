import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";
import Prize from "./components/Prize";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className="row">
          <div className="column">{Board()}</div>
          <div className="column">{Prize()}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
