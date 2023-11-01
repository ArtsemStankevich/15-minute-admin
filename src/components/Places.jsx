import React from 'react';
import placesData from './data/places.json'; // Importuj dane z pliku JSON
import './style/Categories.css'; // Importuj plik CSS

function Places(props) {
  return (
    <div>
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
