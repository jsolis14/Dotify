import React, { useState, useContext, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { AppContext } from '../context/appContext';
import { Switch, Redirect, Route } from 'react-router-dom';

function SpotifyPlayerWrapper() {
    const { authToken } = useContext(AppContext);

    return (
        <React.Fragment>
            {authToken ? (<SpotifyPlayer token={authToken} uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']} />) : <Redirect to='/login' />}
        </React.Fragment>
    )
}

export default SpotifyPlayerWrapper;
