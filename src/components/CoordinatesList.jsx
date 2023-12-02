import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from './TableContainer';
import CoordinatesCreate from './CoordinatesCreate'
import {Container} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function CoordinatesList() {
  const navigate = useNavigate();
  const [Coordinates, setNewCoordinates] = useState([])
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('Coordinates Name'),
        accessor: 'name',
        sortable: true,
        disableFilters: true

      },
      {
        Header: t('Latitude'),
        accessor: 'lat',
        sortable: true,
        disableFilters: true

      },
      {
        Header: t('Longitude'),
        accessor: 'lon',
        sortable: true,
        disableFilters: true

      },
      {
        Header: t('Radius'),
        accessor: 'radius',
        sortable: true,
        disableFilters: true

      },
    ],
    [t]
  );

    
  const fetchCoordinates  = useCallback(async() => {
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

      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userToken}`,
        },
      });
    //  console.log(response)
      if (response.ok) {
        const data = await response.json();
        setNewCoordinates(data);
      //  console.log(data)
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
    fetchCoordinates();
  }, [fetchCoordinates]);

  const handleCoordinateCreated = () => {
    // Po utworzeniu klucza API odśwież listę
    fetchCoordinates();
  };

  return (
    <Container>
      <CoordinatesCreate onCoordinateCreated={handleCoordinateCreated} />
      <TableContainer columns={columns} data={Coordinates} />
    </Container>
  );
}


export default CoordinatesList;
