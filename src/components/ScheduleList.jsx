import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from './TableContainer';
import ScheduleCreate from './ScheduleCreate';
import {Container} from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function ScheduleList() {
  const navigate = useNavigate();
  const [Schedule, setSchedule] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Schedule Name',
        accessor: 'name',
        sortable: true,
        disableFilters: true,
      },
    ],
    []
  );

  const fetchSchedule = useCallback(async() => {
    try {

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      if (userToken) {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/schedule/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSchedule(data);
        } else {
          console.error('Błąd pobierania danych z serwera');
          navigate('/login');
        }
      } else {
        console.error('Brak tokenu użytkownika.');
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
