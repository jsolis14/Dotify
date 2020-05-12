import React from 'react';

function LoginPage() {
    function redirectToSpotify(e) {
        e.preventDefault();
        const scopes = encodeURIComponent("streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify playlist-read-private playlist-read-collaborative")
        const redirect_uri = 'http://localhost:3000/';
        const client_id = 'ad099cca2b5444c59732b6696db3acb9';
        const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&state=123`
        window.location.href = url;
    }

    return (
        <div className='login'>
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
                <button onClick={redirectToSpotify}>Allow Dotify Acess To Spotify</button>
            </div>
        </div>
    );

}

export default LoginPage;
