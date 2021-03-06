import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import { Redirect } from 'react-router-dom';
import PlayListItem from './PlayListItem';


function PlayListBar() {
    const { authToken, setShowCreatePlaylist, playlists, setPlaylists, setAuthToken } = useContext(AppContext);
    const [numberOfPlaylist, setNumberOfPlaylist] = useState(0);
    // const [playlists, setPlaylists] = useState([]);
    const url = 'https://api.spotify.com/v1/me/playlists';

    const getUserPlaylists = async (url, authToken) => {
        const userPlaylists = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        if (userPlaylists.status === 401) {
            setAuthToken('');
            localStorage.removeItem('SPOTIFY_ACCESS');
            localStorage.removeItem('_spharmony_device_id');
            return;
        }

        const userPlaylistsData = await userPlaylists.json();

        setPlaylists((oldPlaylist) => {
            return [...oldPlaylist, ...userPlaylistsData.items]
        });

        setNumberOfPlaylist((oldNum) => {
            return oldNum + userPlaylistsData.items.length;
        })

        if (userPlaylistsData.next !== null) {
            getUserPlaylists(userPlaylistsData.next, authToken);
        }

    }

    function showForm() {
        setShowCreatePlaylist(true);
    }

    useEffect(() => {
        getUserPlaylists(url, authToken);
    }, [])
    return (

        <div className='playlist-container'>
            <div className='playlist__add-button'>
                <div className='playlist-bar__title'>PLAYLISTS</div>
                <a onClick={showForm}>
                    <img className='playlist__add-button-img' src={require('../../images/add-playlist-button.png')} />
                </a>
            </div>
            <div className='playlist__items'>
                {playlists.map(playlist => <PlayListItem key={playlist.id} id={playlist.id} images={playlist.images} name={playlist.name} uri={playlist.uri} />)}
            </div>
        </div>
    );
}

export default PlayListBar;
