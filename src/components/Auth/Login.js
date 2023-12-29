import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import '../../App.css';

const Login = ({ onLogin, onLoginError }) => {
  const cookies = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Validate input
    if (!username || !password) {
      setError('Username and password are required!');
      return;
    }

    setLoading(true);

    // Send login request to the server using fetch
    fetch('http://localhost:50005/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorResponse) => {
            throw new Error(errorResponse.error_description || 'Login failed. Please try again.');
          });
        }
        return response.json();
      })
      .then((res) => {
        console.log('Login successful:', res);
        const { token, userName } = res;
        cookies.set('token', token);
        cookies.set('username', userName);
        onLogin(); // Trigger the parent component action for successful login
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        setError(error.message);
        onLoginError(); // Trigger the parent component action for login error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
