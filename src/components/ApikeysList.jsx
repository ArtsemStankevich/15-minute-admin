import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from './TableContainer';
import ApikeysCreate from './ApikeysCreate';
import { Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function ApikeysList() {
  const navigate = useNavigate();
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

  const fetchApi = useCallback(async() => {
    try {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      const tokenRefreshString = localStorage.getItem('refreshToken');
      const userRefreshToken = JSON.parse(tokenRefreshString);

      const tokenRefresh = {
        refresh: userRefreshToken,
      };

      if (userToken) {

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
          console.log(response)
          console.error('Błąd pobierania danych z serwera');
          navigate('/login');
        }
      } else {
        console.error('Brak tokenu użytkownika.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Błąd pobierania danych z serwera', error);
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    fetchApi();
  }, [fetchApi]); // Usuń fetchApi zależność, aby uniknąć cyklu zależności

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
