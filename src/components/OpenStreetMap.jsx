import React from 'react';
import { CssBaseline } from '@mui/material';



function OpenStreetMap(props) {
  return (
    <div>
      <CssBaseline />

      <h2>OpenStreetMap</h2>
      <p>{props.info}</p>
    </div>
  );
}

export default OpenStreetMap;
