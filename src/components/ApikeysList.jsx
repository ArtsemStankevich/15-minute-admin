import React, { useState, useEffect } from 'react';
import Table from './Table';


function ApikeysList() {

  const [Api, setApi] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Api Name',
        accessor: 'name',
        sortable: true,
      },
    ],
    []
  );

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/credential/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
      //  console.log(response)
        if (response.ok) {
          const data = await response.json();
          setApi(data);
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
      <Table columns={columns} data={Api} />
    </div>
  );
}


export default ApikeysList;
