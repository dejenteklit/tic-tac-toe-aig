import React, { useState } from 'react';
import './App.css';
import './components/Game/Square.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import Game from './components/Game/Game';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    console.log('User logged in!');
    setIsAuth(true);
  };

  const handleRegister = () => {
    console.log('User registered!');
    setIsAuth(true);
  };

  const handleLogout = () => {
    console.log('User logged out!');
    setIsAuth(false);
  };

  const handleNewGame = () => {
    // Define the logic for starting a new game
    console.log('Starting a new game!');
  };

  const handleMove = () => {
    // Define the logic for handling a move in the game
    console.log('Handling a move in the game!');
  };

  return (
    <div className="App">
      {isAuth ? (
        <div>
          <p>Welcome, authenticated user!</p>
          <>
            <Logout onLogout={handleLogout} />
            <Game onNewGame={handleNewGame} onMove={handleMove} />
          </>
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </div>
      )}
    </div>
  );
}

export default App;
