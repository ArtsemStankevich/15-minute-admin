import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';

function ApikeysCreate() {
  const [newNameApi, setNewNameApi] = useState('');
  const [newTokenApi, setNewTokenApi] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
        },
        body: JSON.stringify(apiData), // Zamień dane na format JSON
      });

      if (response.ok) {
        // Wysłano z powodzeniem
        console.log('Pomyślnie utworzono klucz API.');
        // Możesz również zaktualizować stan lub zresetować pola formularza
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
    <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
    <p className='border' style={{width: '100%', height: '93%'}}>
        <h3 style={{ textAlign: 'center', marginTop: 'auto' }}>New Api Key</h3>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            multiline
            rows={1}
            variant="outlined"
            value={newNameApi}
            onChange={(e) => setNewNameApi(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Token"
            multiline
            rows={1}
            variant="outlined"
            value={newTokenApi}
            onChange={(e) => setNewTokenApi(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
        <div style={{ textAlign: 'center' }}>
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
