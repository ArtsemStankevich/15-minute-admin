import React from 'react';
import { CssBaseline, Grid } from '@mui/material';
import ApikeysList from './ApikeysList';
import Header from './Header';



function Apikeys() {


  return (
    <>
    <Header />
    <CssBaseline />
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ApikeysList />
      </Grid>
    </Grid>
  </>
  );
}
export default Apikeys;
