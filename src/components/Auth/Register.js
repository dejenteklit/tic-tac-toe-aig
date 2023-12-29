import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = () => {
    // Validate input
    if (!username || !password) {
      setError('Username and password are required!');
      return;
    }

    setLoading(true);

    // Send registration request to the server using fetch
    fetch('http://localhost:50005/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed. Please try again.');
        }
        return response.json();
      })
      .then((res) => {
        console.log('Registration successful:', res);
        if (typeof onRegister === 'function') {
          onRegister(); // Trigger the parent component action if onRegister is a function
        }
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
      <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default Register;
