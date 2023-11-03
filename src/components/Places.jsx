import React from 'react';
import './style/Categories.css'; 
import { CssBaseline } from '@mui/material';
import PlaceList from './PlaceList';

function Places(props) {
  return (
    <div>
    <CssBaseline />
    <PlaceList />
    </div>
  );
}

export default Places;
