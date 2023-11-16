import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import ScheduleCreate from './ScheduleCreate';
import {Container} from 'reactstrap'

function ScheduleList() {
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

  const fetchSchedule = async () => {
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
        }
      } else {
        console.error('Brak tokenu użytkownika.');
      }
    } catch (error) {
      console.error('Błąd pobierania danych z serwera', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

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
