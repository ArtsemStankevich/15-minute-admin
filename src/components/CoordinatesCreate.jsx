import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';
import { useTranslation } from 'react-i18next';

function ApikeysCreate({ onCoordinateCreated }) {
  const [newNameCoordinates, setnewNameCoordinates] = useState('');
  const [newLon, setNewLon] = useState('');
  const [newLat, setNewLat] = useState('');
  const [newRadius, setNewRadius] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  


  const handleFormSubmit = async (e) => {
    e.preventDefault();




    // Przygotuj dane do wysłania na serwer
    const apiData = {
      name: newNameCoordinates,
      lat: newLat,
      lon: newLon,
      radius: newRadius,
    };

    // Sprawdź, czy wartości dla szerokości i długości mieszczą się w odpowiednich zakresach
    const lat = parseFloat(newLat);
    const lon = parseFloat(newLon);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError('Invalid latitude or longitude values. Latitude should be in the range -90 to 90, and longitude should be in the range -180 to 180.');
      return;
    } else {
      setError('');
    }

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

      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
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
        onCoordinateCreated();
        setnewNameCoordinates('');
        setNewLon('');
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
        <h3 className='auto-center'>{t('New Coordinates')}</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <TextField
            label={t('Coordinates Name')}
            multiline
            rows={1}
            variant="outlined"
            value={newNameCoordinates}
            onChange={(e) => setnewNameCoordinates(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Latitude')}
            multiline
            rows={1}
            variant="outlined"
            value={newLat}
            onChange={(e) => setNewLat(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Longitude')}
            multiline
            rows={1}
            variant="outlined"
            value={newLon}
            onChange={(e) => setNewLon(e.target.value)}
            style={{ marginRight: '20px' }}
          />
          <TextField
            label={t('Radius')}
            multiline
            rows={1}
            variant="outlined"
            value={newRadius}
            onChange={(e) => setNewRadius(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" style={{ margin: '1% auto 0', backgroundColor: 'darkblue', marginLeft: '30px' }}>
            Add Coordinate
          </Button>
        </form>
      </p>
    </div>
  );
}

export default ApikeysCreate;
