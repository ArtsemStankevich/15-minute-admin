import React from 'react';
import './style/Categories.css';

function TextFilter({ column }) {
  if (!column || !column.filterValue) {
    return null;
  }

  const { filterValue, setFilter } = column;

  const selectStyles = {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
  };

  return (
    <div>
      <select
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        style={selectStyles}
      >
        <option value="running">Running</option>
        <option value="stopped">Stopped</option>
        <option value="waiting">Waiting</option>
      </select>
    </div>
  );
}

export default TextFilter;
