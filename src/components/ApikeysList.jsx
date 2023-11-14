import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import ApikeysCreate from './ApikeysCreate';
import {Container} from 'reactstrap'

function ApikeysList() {
  const [api, setApi] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Api Name',
        accessor: 'name',
        sortable: true,
        disableFilters: true,
      },
    ],
    []
  );

  const fetchApi = async () => {
    try {

      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      if (userToken) {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/credential/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Dodaj token do nagłówka Authorization
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApi(data);
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
    fetchApi();
  }, []);

  const handleApiCreated = () => {
    // Po utworzeniu klucza API odśwież listę
    fetchApi();
  };

  return (
    <Container>
      <ApikeysCreate onApiCreated={handleApiCreated} />
      <TableContainer columns={columns} data={api} />
    </Container>
  );
}

export default ApikeysList;
