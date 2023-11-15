// AuthLogin.jsx

import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials, navigate) {
  return fetch('https://15minadmin.1213213.xyz/users/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      navigate('/');
      return data.access;
    });
}

export default function AuthLogin({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(
        {
          username,
          password,
        },
        navigate
      );
      setToken(token);
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

AuthLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
