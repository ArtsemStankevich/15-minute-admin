import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import CoordinatesCreate from './CoordinatesCreate'
import {Container} from 'reactstrap'

function CoordinatesList() {

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

    
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
    //  console.log(response)
      if (response.ok) {
        const data = await response.json();
        setNewCoordinates(data);
      //  console.log(data)
      } else {
        console.error('Błąd pobierania danych z serwera');
      }
    } catch (error) {
      console.error('Błąd pobierania danych z serwera', error);
    }
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCoordinateCreated = () => {
    // Po utworzeniu klucza API odśwież listę
    fetchTasks();
  };

  return (
    <Container>
      <CoordinatesCreate onCoordinateCreated={handleCoordinateCreated} />
      <TableContainer columns={columns} data={Coordinates} />
    </Container>
  );
}


export default CoordinatesList;
