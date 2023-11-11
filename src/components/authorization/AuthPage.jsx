import React, { useState } from 'react';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';

function AuthPage ({ onLogin }) {
  const [isLogginActive, setIsLogginActive] = useState(true);

  const changeState = () => {
    setIsLogginActive((prevState) => !prevState);
  };

  return (
    <div>
      <div className="container">
        {isLogginActive ? <AuthLogin onLogin={onLogin} /> : <AuthRegister />}
      </div>
      <RightSide current={isLogginActive ? 'Register' : 'Login'} onClick={changeState} />
    </div>
  );
};

const RightSide = ({ current, onClick }) => {
  return (
    <div className="right-side" onClick={onClick}>
      <div className="inner-container">
        <div className="text">{current}</div>
      </div>
    </div>
  );
};

export default AuthPage;
