import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from './TableContainer';
import ScheduleCreate from './ScheduleCreate';
import {Container} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ScheduleList() {
  const navigate = useNavigate();
  const [Schedule, setSchedule] = useState([]);
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('Repeat every'),
        accessor: 'human_readable',
        sortable: true,
        disableFilters: true,
      },
    ],
    [t]
  );

  const fetchSchedule = useCallback(async() => {




    try {

      const tokenRefreshString = localStorage.getItem('refreshToken');
      const userRefreshToken = JSON.parse(tokenRefreshString);
  
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

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/schedule/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSchedule(data);
        } else {
          console.error('Błąd pobierania danych z serwera');
          navigate('/login');
        }
    } catch (error) {
      console.error('Błąd pobierania danych z serwera', error);
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const handleScheduleCreated = () => {
    // Po utworzeniu klucza Schedule odśwież listę
    fetchSchedule();
  };

  return (
    <Container>
      <ScheduleCreate onScheduleCreated={handleScheduleCreated} />
      <TableContainer columns={columns} data={Schedule} />
    </Container>
  );
}

export default ScheduleList;

            

            