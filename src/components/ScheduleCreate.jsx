import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';
import { useTranslation } from 'react-i18next';

function ScheduleCreate({ onScheduleCreated }) {
  const [newMinute, setNewMinute] = useState('');
  const [newHour, setNewHour] = useState('');
  const [newDayOfWeek, setNewDayOfWeek] = useState('');
  const [newDayOfMonth, setNewDayOfMonth] = useState('');
  const [newMonthOfYear, setNewMonthOfYear] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

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
      minute: newMinute,
      hour: newHour,
      day_of_week: newDayOfWeek,
      day_of_month: newDayOfMonth,
      month_of_year: newMonthOfYear
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
        setNewDayOfMonth('')
        setNewDayOfWeek('')
        setNewHour('')
        setNewMinute('')
        setNewMonthOfYear('')
      } else {
        console.log(response)
        console.error('Błąd podczas tworzenia klucza Schedule.');
        setError('Incorrect data')
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  return (
    <div>
      <p className='borderer'>
        <h3 className='auto-center'>{t('New Schedule')}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <TextField
            label={t('Minute')}
            multiline
            rows={1}
            variant="outlined"
            value={newMinute}
            onChange={(e) => setNewMinute(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Hour')}
            multiline
            rows={1}
            variant="outlined"
            value={newHour}
            onChange={(e) => setNewHour(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Day of week')}
            multiline
            rows={1}
            variant="outlined"
            value={newDayOfWeek}
            onChange={(e) => setNewDayOfWeek(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Day of Month')}
            multiline
            rows={1}
            variant="outlined"
            value={newDayOfMonth}
            onChange={(e) => setNewDayOfMonth(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Month of Year')}
            multiline
            rows={1}
            variant="outlined"
            value={newMonthOfYear}
            onChange={(e) => setNewMonthOfYear(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <Button variant="contained" color="primary" type="submit" style={{ margin: '1% auto 0', backgroundColor: 'darkblue', marginLeft: '12px' }}>
            {t('Add Schedule')}
          </Button>
        </form>
      </p>
    </div>
  );
}

export default ScheduleCreate;
