import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './loginPage.css';
function LoginPage() {
    function redirectToSpotify(e) {
        e.preventDefault();
        const scopes = encodeURIComponent("streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private")
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
        const client_id = 'ad099cca2b5444c59732b6696db3acb9';
        const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&state=123`
        window.location.href = url;
    }

    return (
        <div className='login-page'>
            <Navbar bg='dark'>

            </Navbar>
            <div className='login-page__content'>
                <div className='login__title'>
                    <h1>Welcome to Dotify!!!</h1>
                </div>
                <div className='login__info'>
                    <p>
                        Dotify is an app that uses the spotify API to create a front-end client for spotify. By authorizing Dotify access
                        to your Spotify account, you will be able to play music, create playlist, add songs to playlist, and even keep track
                        of your most popular artist/songs.
                    </p>
                </div>
                <div className='login__button'>
                    <Button onClick={redirectToSpotify} variant='success'>Allow Dotify Acess To Spotify</Button>
                </div>
                <div className='login__bottom'>
                    <div className='login__logos'>
                        <div className='login-logos__container'>
                            <div className='logos__text'>
                                <p>Powered By</p>
                            </div>
                            <div className='logos__picture'>
                                <a href='https://developer.spotify.com/'><img src={require('../../images/Spotify_Logo_RGB_Green.png')} /></a>
                            </div>
                        </div>
                        <div className='login-logos__container'>
                            <div className='logos__text'>
                                Link to GitHub Repo
                            </div>
                            <div className='logos__picture'>
                                <a href='https://github.com/jsolis14/Dotify'><img src={require('../../images/GitHub-Mark-Light-120px-plus.png')} /></a>
                            </div>
                        </div>
                        <div className='login-logos__container'>
                            <div className='logos__text'>
                                Link to LinkedIn Profile
                            </div>
                            <div className='logos__picture'>
                                <a href='https://www.linkedin.com/in/jesse-solis-3a8212185/'><img src={require('../../images/LI-In-Bug.png')} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;
