import React, { useState, useEffect } from 'react';
import Table from './Table';


function CoordinatesList() {

  const [Coordinates, setNewCoordinates] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Coordinates Name',
        accessor: 'name',
        sortable: true,
      },
      {
        Header: 'Lat',
        accessor: 'lat',
        sortable: true,
      },
      {
        Header: 'Lon',
        accessor: 'lon',
        sortable: true,
      },
      {
        Header: 'Radius',
        accessor: 'radius',
        sortable: true,
      },
    ],
    []
  );

  useEffect(() => {
    
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

    fetchTasks();
  }, []);

  return (
    <div>
      <Table columns={columns} data={Coordinates} />
    </div>
  );
}


export default CoordinatesList;
