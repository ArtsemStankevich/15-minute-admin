import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import {Container} from 'reactstrap'
import { SelectColumnFilter } from './Filters';
import "bootstrap/dist/css/bootstrap.min.css";
import TaskCreate from './TaskCreate';

function TaskList() {

  const [tasks, setTasks] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Task Name',
        accessor: 'name',
        sortable: true,
        disableFilters: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortable: true,
        Filter: SelectColumnFilter,
        
      },
      {
        Header: 'Items Collected',
        accessor: 'items_collected',
        sortable: true,
        disableFilters: true
      },
      {
        Header: 'Errors',
        accessor: 'error_subtask_count',
        sortable: true,
        disableFilters: true
      },
      {
        Header: 'Run/Stop/Cancel',
        accessor: 'actions',
        id: 'runStopCancel',
        disableFilters: true
      },
    ],
    []
  );


    
    const fetchTasks = async () => {
      try {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken) {
        const response = await fetch('https://15minadmin.1213213.xyz/gmaps/task/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userToken}`,
          },
        });
      //  console.log(response)
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        //  console.log(data)
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
      fetchTasks();
    }, []);
  
    const handleTaskCreated = () => {
      // Po utworzeniu klucza API odśwież listę
      fetchTasks();
    };
  
    return (
      <Container>
        <TaskCreate onTaskCreated={handleTaskCreated} />
      <TableContainer columns={columns} data={tasks} />
    </Container>
  );
}


export default TaskList;
