import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next'; // Import react-i18next
import './style/Header.css';

function Header() {
  const [selectedTab, setSelectedTab] = useState('tasks');
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setSelectedTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  };


  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <div>
      <div className="tab-buttons">
        <Select
          value={selectedLanguage}
          onChange={e => handleLanguageChange(e.target.value)}
          className='language-select'
        >
          <MenuItem value="en">{t('English')}</MenuItem>
          <MenuItem value="pl">{t('Polish')}</MenuItem>
          <MenuItem value="de">{t('German')}</MenuItem>
          {/* Add more languages as needed */}
        </Select>
        <ButtonGroup className="header-button-group" variant="contained" aria-label="outlined button group">
          <Button
            className={`header-button ${selectedTab === 'tasks' ? 'active' : ''}`}
            onClick={() => handleNavigation('tasks')}
          >
            {t('Tasks')}
          </Button>
          <Button
            className={`header-button ${selectedTab === 'apiKeys' ? 'active' : ''}`}
            onClick={() => handleNavigation('apiKeys')}
          >
            {t('API Keys')}
          </Button>
          <Button
            className={`header-button ${selectedTab === 'Coordinates' ? 'active' : ''}`}
            onClick={() => handleNavigation('Coordinates')}
          >
            {t('Coordinates')}
          </Button>
          <Button
            className={`header-button ${selectedTab === 'Schedule' ? 'active' : ''}`}
            onClick={() => handleNavigation('Schedule')}
          >
            {t('Schedule')}
          </Button>
        </ButtonGroup>
        <Link to="/login">
          <Button className="header-button" variant="contained">
          {t('Logout')}
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
