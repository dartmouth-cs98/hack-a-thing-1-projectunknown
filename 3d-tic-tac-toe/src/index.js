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

  renderRow(sliceNumber,rowNumber,size) {
    // line below obtained from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    let array = Array.from(Array(size).keys())
    return <div className="board-row">
        {
            array.map ( (n) => {
                return this.renderSquare(sliceNumber*size*size + rowNumber*size + n)
            })
        }
    </div>;
  }
  
  renderBoardSlice(sliceNumber,size) {
    // line below obtained from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
    let array = Array.from(Array(size).keys())
    return <div className="level">
        {
            array.map ( (n) => {
                return this.renderRow(sliceNumber,n,size)
            })
        }
    </div>;
  }

  render() {
    let s=this.props.gameSize
    let array = Array.from(Array(s).keys())
    return (
      <div>
      {
          array.map ( (n) => {
              return this.renderBoardSlice(n,s)
          })
      }
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
      gameSize: 3,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares,this.state.gameSize) || squares[i]) {
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

  changeGameSize(size) {
    this.setState({
      history: [{
        squares: Array(size*size).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      gameSize: size,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares,this.state.gameSize);

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
            gameSize={this.state.gameSize}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="game-parameters">
          <button onClick={() => this.changeGameSize(3)}>3 x 3 x 3</button>
          <button onClick={() => this.changeGameSize(4)}>4 x 4 x 4</button>
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

function calculateWinner(squares,gameSize) {
  if (gameSize === 3) {
    let j = gameSize*gameSize;
    let z = gameSize*gameSize*2;
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
  else {
    let j = gameSize*gameSize;
    let z = gameSize*gameSize*2;
    let y = gameSize*gameSize*3;
    const lines = [
      [0, 1, 2, 4],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
      if (squares[a+j] && squares[a+j] === squares[b+j] && squares[a+j] === squares[c+j] && squares[a+j] === squares[d+j]) {
        return squares[a+j];
      }
      if (squares[a+z] && squares[a+z] === squares[b+z] && squares[a+z] === squares[c+z] && squares[a+z] === squares[d+z]) {
        return squares[a+z];
      }
      if (squares[a+y] && squares[a+y] === squares[b+y] && squares[a+y] === squares[c+y] && squares[a+y] === squares[d+y]) {
        return squares[a+z];
      }
      if (squares[a] && squares[a] === squares[b+j] && squares[a] === squares[c+z] && squares[a] === squares[d+y]) {
        return squares[a];
      }
    }
  
    for (let a = 0; a < j; a++) {
      if (squares[a] && squares[a] === squares[a+j] && squares[a] === squares[a+z] && squares[a] === squares[a+y]) {
        return squares[a];
      }
    }
    
    return null;
  }
}
