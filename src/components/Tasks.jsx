import React from 'react';

import TaskCreate from "./TaskCreate";
import TaskList from "./TaskList";
import { CssBaseline, Grid } from '@mui/material';

function Tasks() {


  return (
    <>
    <CssBaseline />
    <Grid container spacing={1} style={{ width: '100%' }}>
      <Grid item xs={12}>
        <TaskCreate />
      </Grid>
      <Grid item xs={12}>
        <TaskList />
      </Grid>
    </Grid>
  </>
  );
}

export default Tasks;


