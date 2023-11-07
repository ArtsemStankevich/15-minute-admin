import React from 'react';
import './style/Categories.css';
import { CssBaseline, Grid } from '@mui/material';
import CoordinatesCreate from './CoordinatesCreate';
import CoordinatesList from './CoordinatesList';



function Coordinates() {


  return (
    <>
    <CssBaseline />
    <Grid container spacing={1} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <CoordinatesCreate />
      </Grid>
      <Grid item xs={12}>
        <CoordinatesList />
      </Grid>
    </Grid>
  </>
  );
}
export default Coordinates;

