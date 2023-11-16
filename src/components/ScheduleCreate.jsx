import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';

function ScheduleCreate({ onScheduleCreated }) {
  const [newNameSchedule, setNewNameSchedule] = useState('');
  const [newDaySchedule, setNewDaySchedule] = useState('');
  const [newMinuteSchedule, setNewMinuteSchedule] = useState('');
  const [newHourSchedule, setNewHourSchedule] = useState('');


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
      name: newNameSchedule,
      day_of_month: newDaySchedule,
      minute: newMinuteSchedule,
      hour: newHourSchedule
    };

    try {
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
        setNewNameSchedule('');
        setNewDaySchedule('');
        setNewMinuteSchedule('');
        setNewHourSchedule('');
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
        <h3 className='auto-center'>New Schedule Key</h3>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            multiline
            rows={1}
            variant="outlined"
            value={newNameSchedule}
            onChange={(e) => setNewNameSchedule(e.target.value)}
            className='margin-right'
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Day"
            multiline
            rows={1}
            variant="outlined"
            value={newDaySchedule}
            onChange={(e) => setNewDaySchedule(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Hour"
            multiline
            rows={1}
            variant="outlined"
            value={newHourSchedule}
            onChange={(e) => setNewHourSchedule(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Minute"
            multiline
            rows={1}
            variant="outlined"
            value={newMinuteSchedule}
            onChange={(e) => setNewMinuteSchedule(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <div className='auto-center'>
            <Button variant="contained" color="primary" type="submit" style={{ margin: '2% auto 0', backgroundColor: 'darkblue' }}>
              Add Schedule key
            </Button>
          </div>
        </form>
      </p>
    </div>
  );
}

export default ScheduleCreate;
