import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
			 className="square"
			 onClick={() => this.props.onClick()}
	  	>
        {this.props.value }
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
			<Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
			/>
		);
  }

  render() {
    const i = 0;
    const j = 9;
    const z = 18
    return (
      <div>
        <div className="level">
          <div className="board-row">
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
        <div className="level">
          <div className="board-row">
            {this.renderSquare(j+0)}
            {this.renderSquare(j+1)}
            {this.renderSquare(j+2)}
          </div>
          <div className="board-row">
            {this.renderSquare(j+3)}
            {this.renderSquare(j+4)}
            {this.renderSquare(j+5)}
          </div>
          <div className="board-row">
            {this.renderSquare(j+6)}
            {this.renderSquare(j+7)}
            {this.renderSquare(j+8)}
          </div>
        </div>
        <div className="level">
          <div className="board-row">
            {this.renderSquare(z+0)}
            {this.renderSquare(z+1)}
            {this.renderSquare(z+2)}
          </div>
          <div className="board-row">
            {this.renderSquare(z+3)}
            {this.renderSquare(z+4)}
            {this.renderSquare(z+5)}
          </div>
          <div className="board-row">
            {this.renderSquare(z+6)}
            {this.renderSquare(z+7)}
            {this.renderSquare(z+8)}
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
		this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  let j = 9;
  let z = 18;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    if (squares[a+j] && squares[a+j] === squares[b+j] && squares[a+j] === squares[c+j]) {
      return squares[a+j];
    }
    if (squares[a+z] && squares[a+z] === squares[b+z] && squares[a+z] === squares[c+z]) {
      return squares[a+z];
    }
    if (squares[a] && squares[a] === squares[b+j] && squares[a] === squares[c+z]) {
      return squares[a];
    }
  }

  for (let a = 0; a < j; a++) {
    if (squares[a] && squares[a] === squares[a+j] && squares[a] === squares[a+z]) {
      return squares[a];
    }
  }
  
  return null;
}
