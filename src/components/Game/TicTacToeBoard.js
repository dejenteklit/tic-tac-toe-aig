// components/Game/TicTacToeBoard.js
import React from 'react';

function TicTacToeBoard({ board, chooseSquare }) {
  return (
    <div className="tic-tac-toe-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="square" onClick={() => chooseSquare(rowIndex, colIndex)}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TicTacToeBoard;
