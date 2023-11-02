import React from 'react';
import GoogleMapReact from 'google-map-react';


const Map = () => {

  const coordinates = {lat: 54.22, lng:18.38};

  return (
    <div style={{height: '50vh', width: '100%'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCoR0IBs5iHPFGyq3Q8DsuBRZZjziBSVQg'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={''}
        onChildClick={''}
      >
        
      </GoogleMapReact>
    </div>
  );
};

export default Map;