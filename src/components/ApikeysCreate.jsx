import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';

function ApikeysCreate({ onApiCreated }) {
  const [newNameApi, setNewNameApi] = useState('');
  const [newTokenApi, setNewTokenApi] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Pobierz token z sessionStorage
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    // Sprawdź, czy token istnieje
    if (!userToken) {
      console.error('Brak tokenu użytkownika.');
      return;
    }

    // Przygotuj dane do wysłania na serwer
    const apiData = {
      token: newTokenApi,
      name: newNameApi,
    };

    try {
      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/credential/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
        },
        body: JSON.stringify(apiData), // Zamień dane na format JSON
      });

      if (response.ok) {
        // Wysłano z powodzeniem
        console.log('Pomyślnie utworzono klucz API.');
        // Możesz również zaktualizować stan lub zresetować pola formularza
        onApiCreated();
        setNewNameApi('');
        setNewTokenApi('');
      } else {
        console.error('Błąd podczas tworzenia klucza API.');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  return (
    <div>
      <p className='borderer'>
        <h3 className='auto-center'>New Api Key</h3>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            multiline
            rows={1}
            variant="outlined"
            value={newNameApi}
            onChange={(e) => setNewNameApi(e.target.value)}
            className='margin-right'
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Token"
            multiline
            rows={1}
            variant="outlined"
            value={newTokenApi}
            onChange={(e) => setNewTokenApi(e.target.value)}
          />
          <div className='auto-center'>
            <Button variant="contained" color="primary" type="submit" style={{ margin: '2% auto 0', backgroundColor: 'darkblue' }}>
              Add Api key
            </Button>
          </div>
        </form>
      </p>
    </div>
  );
}

export default ApikeysCreate;
