import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    // let history = this.state.history;
    //get history up to stepNumber
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    //make copy of current history of game
    const squares = current.squares.slice();
    console.log("history", history);
    console.log("current", current.squares);

    //stop handleClick if winner is found
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    //combine history of object squares
    let concat = history.concat([
      {
        squares: squares
      }
    ]);

    //set square at index based on xIsNext boolean
    squares[i] = this.state.xIsNext ? "X" : "O";

    console.log("squares", squares);
    console.log("concat ", concat);

    this.setState({
      history: concat,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  componentDidMount() {
    // console.log("mount history", this.state.history);
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      //Description of history
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });

    let status;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          {/* Always render the current game board history */}
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="status">
          {/* {status} */}
        </div>
        <div className="board-row">
          {/* render square based on index passed in */}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//Change Square to a functional componement where it consist of only return function
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log("compare a", a);
    // console.log("compare b", b);
    // console.log("compare c", c);

    if (squares[a] && (squares[a] === squares[b] && squares[a] === squares[c])) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
