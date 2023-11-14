import React from 'react';
import TaskList from "./TaskList";
import { CssBaseline, Grid } from '@mui/material';
import Header from './Header';

function Tasks() {


  return (
    <>
      <Header />
    <CssBaseline />
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TaskList />
      </Grid>
    </Grid>
  </>
  );
}

export default Tasks;


