import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import { Switch, Route } from 'react-router-dom';

function PlayListBar() {
    const { authToken } = useContext(AppContext);

    const getUserPlaylists = async () => {
        const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const userPlaylistsData = await userPlaylists.json();
        console.log(userPlaylistsData);
    }

    useEffect(() => {
        getUserPlaylists();
    })

    return (
        <></>
    );
}

export default PlayListBar;
