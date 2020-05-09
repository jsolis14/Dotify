import React, { useState, useContext, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { AppContext } from './context/appContext.js';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/loginPage/LoginPage';
import HomePage from './components/home/HomePage'


function App() {
  const { authToken, setAuthToken } = useContext(AppContext)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('#')[1]);
    const myParam = urlParams.get('access_token');
    console.log(myParam);
    localStorage.setItem('SPOTIFY_ACCESS', myParam);
    setAuthToken(myParam);
  });


  return (
    <div>
      <h1>WELCOME!!!</h1>
      {/* <SpotifyPlayer token={authToken} uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']} /> */}
      <Switch>
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
      </Switch>
    </div>


  );
}

function AppWithContext() {
  const [authToken, setAuthToken] = useState('');
  if (localStorage.getItem('SPOTIFY_ACCESS') && !authToken) {
    setAuthToken(localStorage.getItem('SPOTIFY_ACCESS'));
  }

  return (
    <AppContext.Provider value={{ authToken, setAuthToken }}>
      <App />

    </AppContext.Provider>
  )
}

export default AppWithContext;
