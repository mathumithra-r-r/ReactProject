import React, { useState } from "react";
import "./App.css"; // Ensure to import the CSS file

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 cells in the game
  const [isXNext, setIsXNext] = useState(true); // Track whose turn it is (X or O)
  const [winner, setWinner] = useState(null); // Store winner, if any

  const checkWinner = (board) => {
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

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return X or O
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if already filled or a winner exists
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner); // Set winner if there's a winner
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  // Render individual cells
  const renderCell = (index) => (
    <button
      className={`cell ${board[index]}`} // Dynamically set class for X or O
      onClick={() => handleClick(index)}
    >
      {board[index]} {/* Display X or O */}
    </button>
  );

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      
      {/* Popup Modal for Winner */}
      {winner && (
        <div className="popup">
          <div className="popup-content">
            <h2>Congratulations!</h2>
            <p>{`Winner: ${winner}`}</p>
            <button className="reset-btn" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
      )}

      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
