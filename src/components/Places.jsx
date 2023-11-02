import React from 'react';
import placesData from './data/places.json'; 
import './style/Categories.css'; 
import { CssBaseline } from '@mui/material';

function Places(props) {
  return (
    <div>
    <CssBaseline />
          <div>

        <h3 style={{ textAlign: 'center' }}>Place List</h3>
        <table id="tasks">
          <thead>
            <tr>
              <th>Place Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {placesData.map((place, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even' : ''}>
                <td>{place.placeName}</td>
                <td>{place.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
      
    </div>
  );
}

export default Places;
