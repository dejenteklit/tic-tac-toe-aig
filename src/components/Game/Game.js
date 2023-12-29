import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import TicTacToeBoard from './TicTacToeBoard';

function Game({ onNewGame, onMove }) {
  const cookies = new Cookies();
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  useEffect(() => {
    // Your logic for checking win or tie
  }, [board]);

 const sendGameMove = async (row, col) => {
  const token = cookies.get('token');

  try {
    const response = await fetch('http://localhost:50005/game/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
        row,
        col,
        player: 'X',
      }),
    });

    if (!response.ok) {
      console.error('Game move request failed:', response.status, response.statusText);
      const responseBody = await response.json();
      console.log('Server Error Response:', responseBody.error_description || responseBody.error);
    } else {
      const responseBody = await response.json();
      console.log('Server Response:', responseBody);
      onMove(); // Call the onMove callback when the move is successful
    }
  } catch (error) {
    console.error('Game move request failed:', error.message);
  }
};


  const chooseSquare = async (row, col) => {
    console.log('Clicked on square:', row, col);

    if (board[row][col] === '') {
      console.log('Sending game move to server...');

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = 'X';
        return newBoard;
      });

      onNewGame(); // Call the onNewGame callback when starting a new game
      await sendGameMove(row, col);
    }
  };

  return (
    <div className="game">
      <h2>Tic Tac Toe Game</h2>
      <TicTacToeBoard board={board} chooseSquare={chooseSquare} />
    </div>
  );
}

export default Game;
