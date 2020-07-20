import React, { useState, useContext, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { AppContext } from './context/appContext.js';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import LoginPage from './components/loginPage/LoginPage';
import PlayListBar from './components/playlist-bar/PlayListBar';
import PlayListDetail from './components/playlist-bar/PlayListDetail';
import PlaylistForm from './components/playlistForm/PlayListForm';
import ArtistPage from './components/artistPage/ArtistPage';
import Notification from './components/notification/Notification';
import SearchPage from './components/search/SearchPage';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import AddToPlaylistForm from './components/add-to-playlist/AddToPlaylistForm.js';
import RecPage from './components/homePage/RecPage';
import AlbumPage from './components/albumPage/AlbumPage';
import { Navbar, Button, Form, FormControl } from 'react-bootstrap';
import SearchBar from './components/search/SearchBar';
function App() {
  const { authToken, showCreatePlaylist, showNotification, showAddToPlaylistForm } = useContext(AppContext)


  return (
    <>
      <div className='page-body'>
        <div className='side-pannel'>
          <SimpleBar className='side-bar-scrollbar' style={{ height: '100%', width: '100%' }} >

            <div className='navlink-container'>
              <div className='navlink__home navlink'>
                <NavLink className='navlink__items' exact to='/'>
                  <div className='navlink__icon'>
                    <img alt='home-icon' src="https://img.icons8.com/ios/50/000000/home.png" />
                  </div>
                  <div className='navlink__text-container'>
                    <div className='navlink__text'>Home</div>
                  </div>
                </NavLink>
              </div>
              <div className='navlink__Search navlink'>
                <NavLink className='navlink__items' to='/search'>
                  <div className='navlink__icon'>
                    <img alt='search-icon' src="https://img.icons8.com/ios/50/000000/search--v1.png" />
                  </div>
                  <div className='navlink__text-container'>
                    <div className='navlink__text'>Search</div>
                  </div>
                </NavLink>
              </div>
              {/* <div className='navlink__top-artists navlink'>
                <NavLink to='/' className='navlink__items'>
                  <div className='navlink__icon'>
                    <img alt='artist-icon' src="https://img.icons8.com/ios/48/000000/dj.png" />
                  </div>
                  <div className='navlink__text-container'>
                    <div className='navlink__text'>Top Artist</div>
                  </div>
                </NavLink>
              </div>
              <div className='navlink__top-songs navlink'>
                <NavLink to='/' className='navlink__items'>
                  <div className='navlink__icon'>
                    <img alt='song-icon' src="https://img.icons8.com/ios/48/000000/microsoft-groove.png" />
                  </div>
                  <div className='navlink__text-container'>
                    <div className='navlink__text'>Top Songs</div>
                  </div>
                </NavLink>
              </div> */}
            </div>
            {(authToken ? <PlayListBar /> : <></>)}

          </SimpleBar>
        </div>
        <SimpleBar className='main-body-scrollbar' style={{ height: '100%' }}>
          <Navbar variant="dark" style={{ backgroundColor: '#454d55' }}>
            <div className='nav-container'>
              <div className='nav-container__title-container'>
                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
              Dotify
              </Navbar.Brand>
                <SearchBar />
              </div>
              <div>
                <Button variant="primary">Log Out</Button>
              </div>
            </div>
          </Navbar>
          <Switch>
            <Route exact path='/' component={RecPage} />
            <Route exact path='/playlist/:playlistId' component={PlayListDetail} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/artist/:artistId' component={ArtistPage} />
            <Route exact path='/album/:albumId' component={AlbumPage} />
          </Switch>
        </SimpleBar>
      </div>
      {showNotification.show ? <Notification /> : <></>}
      {showCreatePlaylist ? <PlaylistForm /> : <></>}
      {showAddToPlaylistForm.show ? <AddToPlaylistForm /> : <></>}
      <div className='spotify-player'>
        <SpotifyPlayer name='Dotify Player' token={authToken} uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']} />
      </div>
    </>

  );
}

function AppWithContext() {
  const [authToken, setAuthToken] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [userId, setUserId] = useState('');
  const [showNotification, setShowNotification] = useState({ show: false, name: '', artist: '' });
  const [showAddToPlaylistForm, setShowAddToPlaylistForm] = useState({ show: false, track: '' });
  const [playlists, setPlaylists] = useState([]);

  if (localStorage.getItem('SPOTIFY_ACCESS') && !authToken) {
    setAuthToken(localStorage.getItem('SPOTIFY_ACCESS'));
  }

  function getAuthFromUrl() {
    const urlParams = new URLSearchParams(window.location.href.split('#')[1]);
    const myParam = urlParams.get('access_token');

    if (myParam) {
      localStorage.setItem('SPOTIFY_ACCESS', myParam);
      setAuthToken(myParam);
    }
  }

  async function getUserId() {
    const userData = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    if (userData.status === 401) {
      setAuthToken('');
      localStorage.removeItem('SPOTIFY_ACCESS');
      localStorage.removeItem('_spharmony_device_id');
      // window.location.href = process.env.REACT_APP_REDIRECT_URI + '/login';
      return;
    }

    const { id } = await userData.json();
    setUserId(id);
  }

  if (!authToken) {
    getAuthFromUrl();
  }

  useEffect(() => {
    getUserId();
  }, [])

  return (
    <AppContext.Provider value={{ authToken, setAuthToken, showCreatePlaylist, setShowCreatePlaylist, userId, showNotification, setShowNotification, showAddToPlaylistForm, setShowAddToPlaylistForm, playlists, setPlaylists }}>
      {(authToken ? <App /> : <Redirect to='/login' />)}
      <Switch>
        <Route exact path='/login' component={LoginPage} />
      </Switch>


    </AppContext.Provider>
  )
}

export default AppWithContext;
