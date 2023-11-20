import React, {Fragment} from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { Table} from 'reactstrap';
//import { Table, Row, Col, Button, Input } from 'reactstrap';
import './style/Categories.css';
import { Filter, DefaultColumnFilter } from './Filters';

function TableContainer({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
//    pageOptions,
//    pageCount,
//    state: { pageIndex, pageSize }, 
//    gotoPage,
//    previousPage,
//    nextPage,
//    canPreviousPage,
//    canNextPage,
//    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
    },
    useFilters,
    useSortBy, 
    usePagination,

  );

  const runTask = async (taskId) => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    // Sprawdź, czy token istnieje
    if (!userToken) {
      console.error('Brak tokenu użytkownika.');
      return;
    }
    try {
      const response = await fetch(`https://15minadmin.1213213.xyz/gmaps/task/${taskId}/running/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Dodaj token do nagłówka Authorization
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        console.log('Pomyślnie uruchomiono zadanie.');
        // Tutaj możesz obsłużyć dodatkowe kroki po pomyślnym uruchomieniu zadania
      } else {
        console.error('Błąd podczas uruchamiania zadania.');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  const stopTask = async (taskId) => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    // Sprawdź, czy token istnieje
    if (!userToken) {
      console.error('Brak tokenu użytkownika.');
      return;
    }
    try {
      const response = await fetch(`https://15minadmin.1213213.xyz/gmaps/task/${taskId}/cancel/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Dodaj token do nagłówka Authorization
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        console.log('Pomyślnie zatrzymano zadanie.');
        // Tutaj możesz obsłużyć dodatkowe kroki po pomyślnym zatrzymaniu zadania
      } else {
        console.error('Błąd podczas zatrzymywania zadania.');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

/*  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
*/
  const handleActionClick = (taskId, action) => {
    if (action === 'run') {
      runTask(taskId);
    } else if (action === 'stop') {
      stopTask(taskId);
    }
  };

  return (
    <Fragment>

      <Table bordered hover {...getTableProps()} className="border-max" id="tasks">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                  {column.render('Header')}
                  {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={row.index % 2 === 0 ? 'even' : ''}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === 'runStopCancel' ? (
                      <div>
                        {console.log(row.values)}
                        {row.values.status === 'running' && (
                          <button
                            className="table-button"
                            onClick={() => handleActionClick(row.original.id, 'stop')}
                          >
                            Stop
                          </button>
                        )}
                        {row.values.status === 'waiting' && (
                          <button
                            className="table-button"
                            onClick={() => handleActionClick(row.original.id, 'run')}
                          >
                            Run
                          </button>
                        )}
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      </Table>
    {/*
    <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
    <Col md={3}>
      <Button
        color="primary"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </Button>
      <Button
        color="primary"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {"<"}
      </Button>
    </Col>
    <Col md={2} style={{ marginTop: 7 }}>
      Page{" "}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>
    </Col>
    <Col md={2}>
      <Input
        type="number"
        min={1}
        style={{ width: 70 }}
        max={pageOptions.length}
        defaultValue={pageIndex + 1}
        onChange={onChangeInInput}
      />
    </Col>
    <Col md={2}>
      <Input type="select" value={pageSize} onChange={onChangeInSelect}>
        {[3, 10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Input>
    </Col>
    <Col md={3}>
      <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
        {">"}
      </Button>
      <Button
        color="primary"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </Button>
    </Col>
  </Row>
        */}
    </Fragment>
  );
}

export default TableContainer;

