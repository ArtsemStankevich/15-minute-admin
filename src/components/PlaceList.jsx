import React, {useState, useEffect } from 'react';
import TableContainer from './TableContainer';

function PlaceList() {

  const [placesData, setPlacesData] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Place Name',
        accessor: 'value',
        sortable: true,
        disableFilters: true

      },

    ],
    []
  );

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/place/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setPlacesData(data);
          console.log(data)
        } else {
          console.error('Błąd pobierania danych z serwera');
        }
      } catch (error) {
        console.error('Błąd pobierania danych z serwera', error);
      }
    };

    fetchTasks(); // Wywołujemy funkcję pobierającą dane po zamontowaniu komponentu
  }, []);

  return (
    <div>
      <TableContainer columns={columns} data={placesData} />
    </div>
  );
}


export default PlaceList;
