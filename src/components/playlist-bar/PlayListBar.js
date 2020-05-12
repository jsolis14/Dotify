import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import PlayListItem from './PlayListItem';

function PlayListBar() {
    const { authToken } = useContext(AppContext);
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

    useEffect(() => {
        getUserPlaylists();
    }, [numberOfPlaylist])
    return (

        <>
            <div>
                <button>+Playlist</button>
            </div>
            <ul>
                {playlists.map(playlist => <PlayListItem key={playlist.id} id={playlist.id} images={playlist.images} name={playlist.name} uri={playlist.uri} />)}
            </ul>

        </>
    );
}

export default PlayListBar;
