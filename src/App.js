import React from 'react';
import Header from './components/Header';
import './App.css';
import AuthLogin from './components/authorization/AuthLogin';
import useToken from './useToken';



function App() {

  const { token, setToken } = useToken();


  console.log(token)

  if(!token) {
    return <AuthLogin setToken={setToken} />
  }

  return (
    <div>
      <Header />
    </div>
  );
  

  }

export default App;
