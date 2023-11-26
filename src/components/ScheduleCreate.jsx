import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';

function ScheduleCreate({ onScheduleCreated }) {
  const [newHumanreadable, setNewHumanreadable] = useState('');


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
    const ScheduleData = {     
      human_readable: newHumanreadable,
    };

    try {
      const tokenRefreshString = localStorage.getItem('refreshToken');
      const userRefreshToken = JSON.parse(tokenRefreshString);

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      const tokenRefresh = {
        refresh: userRefreshToken,
      };

      const responseToken = await fetch('https://15minadmin.1213213.xyz/users//token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenRefresh),
      });

      console.log(responseToken);
      if (responseToken.ok) {
        const data = await responseToken.json();
        localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
        localStorage.setItem('token', JSON.stringify(data.access));
      } else {
        console.error('Błąd podczas refresh token');
      }

      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/schedule/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
        },
        body: JSON.stringify(ScheduleData), // Zamień dane na format JSON
      });

      if (response.ok) {
        // Wysłano z powodzeniem
        console.log('Pomyślnie utworzono klucz Schedule.');
        // Możesz również zaktualizować stan lub zresetować pola formularza
        onScheduleCreated();
        setNewHumanreadable('');
      } else {
        console.error('Błąd podczas tworzenia klucza Schedule.');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  return (
    <div>
      <p className='borderer'>
        <h3 className='auto-center'>New Schedule</h3>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Repeat every"
            multiline
            rows={1}
            variant="outlined"
            value={newHumanreadable}
            onChange={(e) => setNewHumanreadable(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <Button variant="contained" color="primary" type="submit" style={{ margin: '1% auto 0', backgroundColor: 'darkblue', marginLeft: '12px' }}>
            Add Schedule
          </Button>
        </form>
      </p>
    </div>
  );
}

export default ScheduleCreate;
