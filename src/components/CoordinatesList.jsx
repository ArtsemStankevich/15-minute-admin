import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from './TableContainer';
import CoordinatesCreate from './CoordinatesCreate'
import {Container} from 'reactstrap'
import { useNavigate } from 'react-router-dom';


function CoordinatesList() {
  const navigate = useNavigate();
  const [Coordinates, setNewCoordinates] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Coordinates Name',
        accessor: 'name',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'Lat',
        accessor: 'lat',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'Lon',
        accessor: 'lon',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'Radius',
        accessor: 'radius',
        sortable: true,
        disableFilters: true

      },
    ],
    []
  );

    
  const fetchCoordinates  = useCallback(async() => {
    try {

      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);

      if (userToken) {
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
    } else {
      console.error('Brak tokenu użytkownika.');
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
