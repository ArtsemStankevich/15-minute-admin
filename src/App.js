// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import AuthLogin from './components/authorization/AuthLogin';
import useToken from './useToken';
import Places from './components/Places';
import Tasks from './components/Tasks';
import APIKeys from './components/APIkeys';
import Coordinates from './components/Coordinates';

function App() {
  const { token, setToken } = useToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/login"
          element={!token ? <AuthLogin setToken={setToken} /> : <Navigate to="/" />}
        />
        <Route path="/places" element={token ? <Places /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/apiKeys" element={token ? <APIKeys /> : <Navigate to="/login" />} />
        <Route path="/coordinates" element={token ? <Coordinates /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
