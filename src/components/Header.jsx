import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './style/Header.css';

function Header() {
  const [selectedTab, setSelectedTab] = useState('tasks');
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setSelectedTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };

  return (
    <div>
      <div className="tab-buttons">
        <ButtonGroup className="header-button-group" variant="contained" aria-label="outlined button group">
          <Button
            className={`header-button ${selectedTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleNavigation('tasks')}
          >
            Tasks
          </Button>
          <Button
            className={`header-button ${selectedTab === 'places' ? 'active' : ''}`}
            onClick={() => handleNavigation('places')}
          >
            Places
          </Button>
          <Button
            className={`header-button ${selectedTab === 'apiKeys' ? 'active' : ''}`}
            onClick={() => handleNavigation('apiKeys')}
          >
            API Keys
          </Button>
          <Button
            className={`header-button ${selectedTab === 'Coordinates' ? 'active' : ''}`}
            onClick={() => handleNavigation('Coordinates')}
          >
            Coordinates
          </Button>
        </ButtonGroup>
        <Link to="/login">
          <Button className="header-button" variant="contained">
            Login
          </Button>
        </Link>
      </div>
      <hr className='header-border'></hr>
      <div>
        {/* To zostanie automatycznie zastąpione przez komponenty na odpowiednich trasach */}
      </div>
    </div>
  );
}

export default Header;
