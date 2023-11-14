import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Route path="/login" element={<AuthLogin setToken={setToken} />} />
        <Route
          path="/"
          element={
            token ? (
              <>
                <Header />
                <Routes>
                  <Route path="places" element={<Places />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="apiKeys" element={<APIKeys />} />
                  <Route path="coordinates" element={<Coordinates />} />
                </Routes>
              </>
            ) : (
              <AuthLogin setToken={setToken} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
