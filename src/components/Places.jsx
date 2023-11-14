// Places.jsx
import React, { useState } from 'react';
import './style/Categories.css'; 
import { CssBaseline } from '@mui/material';
import PlaceList from './PlaceList';
import Header from './Header';

function Places(props) {
  const [selectedTab, setSelectedTab] = useState('places'); // Ustawianie domyślnej zakładki

  return (
    <div>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <CssBaseline />
      <PlaceList />
    </div>
  );
}

export default Places;
