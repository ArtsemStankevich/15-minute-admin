import React, { useState } from 'react';
import Header from './components/Header';
import AuthPage from './components/authorization/AuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Tutaj możesz umieścić logikę logowania, np. poprzez zapytanie do serwera
    // Po poprawnym zalogowaniu ustaw stan isAuthenticated na true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Tutaj możesz umieścić logikę wylogowania, np. poprzez zapytanie do serwera
    // Po poprawnym wylogowaniu ustaw stan isAuthenticated na false
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Header onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
