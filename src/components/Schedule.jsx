import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import ScheduleList from "./ScheduleList";

function Schedule() {
  return (
    <>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ScheduleList />
        </Grid>
      </Grid>
    </>
  );
}
export default Schedule;
