import React from "react";
import { CssBaseline, Grid } from "@mui/material";
import ApikeysList from "./ApikeysList";

function Apikeys() {
  return (
    <>
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
