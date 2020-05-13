import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import PlayListItem from './PlayListItem';

function PlayListBar() {
    const { authToken, setShowCreatePlaylist } = useContext(AppContext);
    const [numberOfPlaylist, setNumberOfPlaylist] = useState('');
    const [playlists, setPlaylists] = useState([]);

    const getUserPlaylists = async () => {
        const userPlaylists = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const userPlaylistsData = await userPlaylists.json();
        console.log(userPlaylistsData);
        setPlaylists(userPlaylistsData.items);
        setNumberOfPlaylist(userPlaylistsData.items.length);
    }

    function showForm() {
        setShowCreatePlaylist(true);
    }

    useEffect(() => {
        getUserPlaylists();
    }, [numberOfPlaylist])
    return (

        <div className='playlist-container'>
            <div className='playlist__add-button'>
                <button onClick={showForm}>+Playlist</button>
            </div>
            <div className='playlist__items'>
                {playlists.map(playlist => <PlayListItem key={playlist.id} id={playlist.id} images={playlist.images} name={playlist.name} uri={playlist.uri} />)}
            </div>
        </div>
    );
}

export default PlayListBar;
