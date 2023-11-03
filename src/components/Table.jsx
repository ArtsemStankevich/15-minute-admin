import React from 'react';
import { useTable, usePagination } from 'react-table';
import './style/Categories.css';

function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      pageOptions,
      state: { pageIndex, pageSize },
      gotoPage,
      previousPage,
      nextPage,
      canPreviousPage,
      canNextPage,
      setPageSize,
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 3 },
      },
      usePagination
    );

  return (
    <div>
      <table {...getTableProps()} className="border-max" id="tasks">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={row.index % 2 === 0 ? 'even' : ''}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                    {cell.column.id === 'runStopCancel' ? (
                      <div>
                        <button className="button">Run</button>
                        <button className="button">Stop</button>
                        <button className="button">Cancel</button>
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
      </table>
      <div className="pagination" style={{ textAlign: 'center' }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[3, 5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;
