import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import SongItem from '../song/SongItem';

function PlayListDetail(props) {
    const { authToken } = useContext(AppContext)
    const [playListSongs, setPlaylistSongs] = useState([]);

    const getPlaylistSongs = async () => {
        console.log(props)
        const playlist_id = props.match.params.playlistId;
        const playlistSongs = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const playlistSongsData = await playlistSongs.json();
        console.log(playlistSongsData);
        setPlaylistSongs(playlistSongsData.items);
    }


    useEffect(() => {
        getPlaylistSongs();
    }, [props.match.params.playlistId])

    return (
        <>
            <div className='play-list-songs'>
                {playListSongs.map(({ track }) => {
                    return <SongItem key={track.id} track={track} playlistId={props.match.params.playlistId} />
                })}
            </div>

        </>
    )
}

export default PlayListDetail;
