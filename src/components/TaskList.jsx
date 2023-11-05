import React, { useState, useEffect } from 'react';
import Table from './Table';
import TextFilter from './Table';


function TaskList() {

  const [tasks, setTasks] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Task Name',
        accessor: 'name',
        sortable: true,
      },
      {
        Header: 'Category',
        accessor: 'category',
        sortable: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        Filter: TextFilter,
      },
      {
        Header: 'Items Collected',
        accessor: 'items_collected',
        sortable: true,
      },
      {
        Header: 'Errors',
        accessor: 'error_subtask_count',
        sortable: true,
      },
      {
        Header: 'Run/Stop/Cancel',
        accessor: 'actions',
        id: 'runStopCancel',
      },
    ],
    []
  );

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/task/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
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
      <Table columns={columns} data={tasks} />
    </div>
  );
}


export default TaskList;
