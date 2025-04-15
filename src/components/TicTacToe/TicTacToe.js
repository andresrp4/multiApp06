import React, { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner 
  ? `Vencedor: ${winner}` 
  : `Próximo jogador: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="tic-tac-toe">
      <h2>Jogo da Velha</h2>
      <div className={`status ${winner ? 'winner' : ''}`}>{status}</div>
      <div className="board">
        {board.map((square, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <button onClick={resetGame}>Reiniciar Jogo</button>
    </div>
  );
}

export default TicTacToe;