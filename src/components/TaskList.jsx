import React from 'react';
import tasksData from './data/tasks.json';
import Table from './Table';

function TaskList() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Task Name',
        accessor: 'taskName',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Items Collected',
        accessor: 'itemsCollected',
      },
      {
        Header: 'Errors',
        accessor: 'errors',
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
