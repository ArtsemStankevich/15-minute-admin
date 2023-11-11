import React, { useState } from 'react';

function AuthRegister(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Tutaj możesz umieścić logikę rejestracji, np. poprzez zapytanie do serwera
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default AuthRegister;
