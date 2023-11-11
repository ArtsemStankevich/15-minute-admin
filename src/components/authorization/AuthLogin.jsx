import React, { useState } from 'react';

function AuthLogin ({ onLogin }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Tutaj możesz umieścić logikę logowania, np. poprzez zapytanie do serwera
    // Po poprawnym zalogowaniu wywołaj funkcję onLogin przekazaną jako prop
    onLogin();
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthLogin;
