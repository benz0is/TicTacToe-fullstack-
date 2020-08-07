import React from "react";
import ReactDOM from "react-dom";
import { Board } from "./components/board";

import "./styles/board.css";
import "./styles/box.css";
import "./styles/buttons.css";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Board></Board>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
