import React from "react";
import Data from "./data";

import { Box } from "./board-box";

import * as utils from "../utils/functions";

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxes: Array(9).fill(null),
      history: [],
      xIsNext: true,
      pripe: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("boxes") != null) {
      this.setState({
        boxes: JSON.parse(localStorage.getItem("boxes")),
      });
    } else return;
  }

  handleBoxClick(index) {
    const boxes = this.state.boxes;

    let history = this.state.history;

    if (utils.findWinner(boxes) || boxes[index]) {
      return;
    }

    if (utils.areAllBoxesClicked(boxes) === true) {
      return;
    }

    boxes[index] = this.state.xIsNext ? "x" : "o";
    localStorage.setItem("boxes", JSON.stringify(boxes));

    history.push(this.state.xIsNext ? "x" : "o");
    fetch("/todos/58", {
      method: "PUT",
      body: JSON.stringify({
        description: history,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));

    this.setState({
      boxes: boxes,
      history: history,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleBoardRestart = () => {
    this.setState({
      boxes: Array(9).fill(null),
      history: [],
      xIsNext: true,
    });
    localStorage.removeItem("boxes");
    fetch("/todos/58", {
      method: "PUT",
      body: JSON.stringify({
        description: "",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  render() {
    const winner = utils.findWinner(this.state.boxes);

    const isFilled = utils.areAllBoxesClicked(this.state.boxes);

    let status;

    if (winner) {
      status = `The winner is: ${winner}!`;
      localStorage.removeItem("boxes");
      fetch("/todos/58", {
        method: "PUT",
        body: JSON.stringify({
          description: "",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (!winner && isFilled) {
      status = "Game drawn!";
      localStorage.removeItem("boxes");
      fetch("/todos/58", {
        method: "PUT",
        body: JSON.stringify({
          description: "",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else {
      status = `It is ${this.state.xIsNext ? "x" : "o"}'s turn.`;
    }

    return (
      <div className="board-full">
        <div>{this.state.lobis}</div>
        <div className="board-wrapper">
          <div className="board">
            <p>{this.state.response}</p>
            <h2 className="board-heading">{status}</h2>

            <div className="board-row">
              <Box
                value={this.state.boxes[0]}
                onClick={() => this.handleBoxClick(0)}
              />

              <Box
                value={this.state.boxes[1]}
                onClick={() => this.handleBoxClick(1)}
              />

              <Box
                value={this.state.boxes[2]}
                onClick={() => this.handleBoxClick(2)}
              />
            </div>

            <div className="board-row">
              <Box
                value={this.state.boxes[3]}
                onClick={() => this.handleBoxClick(3)}
              />

              <Box
                value={this.state.boxes[4]}
                onClick={() => this.handleBoxClick(4)}
              />

              <Box
                value={this.state.boxes[5]}
                onClick={() => this.handleBoxClick(5)}
              />
            </div>

            <div className="board-row">
              <Box
                value={this.state.boxes[6]}
                onClick={() => this.handleBoxClick(6)}
              />

              <Box
                value={this.state.boxes[7]}
                onClick={() => this.handleBoxClick(7)}
              />

              <Box
                value={this.state.boxes[8]}
                onClick={() => this.handleBoxClick(8)}
              />
            </div>
          </div>

          {
            <div className="board-footer">
              <button className="btn" onClick={this.handleBoardRestart}>
                Start new game
              </button>
            </div>
          }
        </div>{" "}
        <Data className="board-full"></Data>
      </div>
    );
  }
}
