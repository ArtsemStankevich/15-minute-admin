import React, { useState } from 'react';
import Places from './Places';
import Tasks from './Tasks';
import APIKeys from './APIkeys';
import Coordinates from './Coordinates';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './style/Header.css';


function Header() {
  const [selectedTab, setSelectedTab] = useState('tasks');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  return (
    <div>
      <div className="tab-buttons">
        <ButtonGroup className="header-button-group" variant="contained" aria-label="outlined button group">
          <Button
            className={`header-button ${selectedTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleTabClick('tasks')}
          >
            Tasks
          </Button>
          <Button
            className={`header-button ${selectedTab === 'places' ? 'active' : ''}`}
            onClick={() => handleTabClick('places')}
          >
            Places
          </Button>
          <Button
            className={`header-button ${selectedTab === 'apiKeys' ? 'active' : ''}`}
            onClick={() => handleTabClick('apiKeys')}
          >
            API Keys
          </Button>
          <Button
            className={`header-button ${selectedTab === 'Coordinates' ? 'active' : ''}`}
            onClick={() => handleTabClick('Coordinates')}
          >
            Coordinates
          </Button>

        </ButtonGroup>
      </div>
      <hr></hr>
      <div>
        {selectedTab === 'places' && <Places />}
        {selectedTab === 'tasks' && <Tasks />}
        {selectedTab === 'apiKeys' && <APIKeys />}
        {selectedTab === 'Coordinates' && <Coordinates />}
      </div>
    </div>
  );
}

export default Header;
