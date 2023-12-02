import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

async function loginUser(credentials, navigate, setLoginError) {
  return fetch('https://15minadmin.1213213.xyz/users/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Network response was not ok');
      }
      localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
      navigate('/');
      return data.access;
    })
    .catch((error) => {
      setLoginError(error.message);
      throw error;
    });
}

export default function AuthLogin({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginError(''); // Clear previous login errors
      const token = await loginUser(
        {
          username,
          password,
        },
        navigate,
        setLoginError
      );
      setToken(token);
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login-wrapper" data-testid="auth">
      <h1>{t('Please Log In')}</h1>
      <form onSubmit={handleSubmit}>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <label>
          <p>{t('Username')}</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>{t('Password')}</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">{t('Submit')}</button>
        </div>
      </form>
    </div>
  );
}


AuthLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
