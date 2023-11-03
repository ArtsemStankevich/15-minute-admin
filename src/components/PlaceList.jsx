import React from 'react';
import placesData from './data/places.json';
import Table from './Table';

function PlaceList() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Place Name',
        accessor: 'placeName',
        sortable: true,
      },
      {
        Header: 'Category',
        accessor: 'category',
        sortable: true,
      },
    ],
    []
  );

 

  return (
    <div>
      <Table columns={columns} data={placesData} />
    </div>
  );
}


export default PlaceList;
