import React from 'react';
import './style/Categories.css';
import { CssBaseline, Grid } from '@mui/material';
import CoordinatesList from './CoordinatesList';



function Coordinates() {


  return (
    <>
    <CssBaseline />
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CoordinatesList />
      </Grid>
    </Grid>
  </>
  );
}
export default Coordinates;

