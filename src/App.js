// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import AuthLogin from './components/authorization/AuthLogin';
import useToken from './useToken';
import Tasks from './components/Tasks';
import APIKeys from './components/APIkeys';
import Coordinates from './components/Coordinates';
import Schedule from './components/Schedule';
import TaskFullStats from './components/TaskFullStats';

function App() {
  const { token, setToken } = useToken();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthLogin setToken={setToken} />} />
        <Route
          path="/*"
          element={
            token ? (
              <>
                <Header />
                <Routes>
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="apiKeys" element={<APIKeys />} />
                  <Route path="coordinates" element={<Coordinates />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="fullstats/:taskid" element={<TaskFullStats />} />
                  <Route index element={<Navigate to="/tasks" replace />} />
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
