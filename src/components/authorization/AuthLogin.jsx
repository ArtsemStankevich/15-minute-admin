// AuthLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      navigate('/'); // Przekieruj użytkownika na stronę główną po zalogowaniu
      return data.access;
    });
}

export default function AuthLogin({ setToken }) {
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
      console.log(token);
      setToken(token);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
