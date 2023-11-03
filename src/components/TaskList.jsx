import React from 'react';
import tasksData from './data/tasks.json';
import Table from './Table';

function TaskList() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Task Name',
        accessor: 'taskName',
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
      },
      {
        Header: 'Items Collected',
        accessor: 'itemsCollected',
        sortable: true,
      },
      {
        Header: 'Errors',
        accessor: 'errors',
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

 

  return (
    <div>
      <Table columns={columns} data={tasksData} />
    </div>
  );
}


export default TaskList;
