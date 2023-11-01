import React, { useState } from 'react';
import Places from './Places';
import Tasks from './Tasks';
import APIKeys from './APIkeys';
import OpenStreetMap from './OpenStreetMap';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './style/Header.css';

function Header() {
  const [selectedTab, setSelectedTab] = useState('places');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="tab-buttons">
        <ButtonGroup className="button-group" variant="outlined" aria-label="outlined button group">
          <Button
            className={`button ${selectedTab === 'places' ? 'active' : ''}`}
            onClick={() => handleTabClick('places')}
          >
            Places
          </Button>
          <Button
            className={`button ${selectedTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleTabClick('tasks')}
          >
            Tasks
          </Button>
          <Button
            className={`button ${selectedTab === 'apiKeys' ? 'active' : ''}`}
            onClick={() => handleTabClick('apiKeys')}
          >
            API Keys
          </Button>
          <Button
            className={`button ${selectedTab === 'openStreetMap' ? 'active' : ''}`}
            onClick={() => handleTabClick('openStreetMap')}
          >
            OpenStreetMap
          </Button>
        </ButtonGroup>
      </div>
      <div>
        {selectedTab === 'places' && <Places />}
        {selectedTab === 'tasks' && <Tasks />}
        {selectedTab === 'apiKeys' && <APIKeys />}
        {selectedTab === 'openStreetMap' && <OpenStreetMap />}
      </div>
    </div>
  );
}

export default Header;
