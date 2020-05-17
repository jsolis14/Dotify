import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import SongItem from '../song/SongItem';
import Table from 'react-bootstrap/Table';
import './playListDetail.css';
import PlayListHeader from './PlayListHeader';

function PlayListDetail(props) {
    const { authToken } = useContext(AppContext)
    const [playListSongs, setPlaylistSongs] = useState([]);
    const [playlistDetail, setPlaylistDetails] = useState({ images: [], owner: {} });
    const playlist_id = props.match.params.playlistId;
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

    const getPlaylistSongs = async (url, authToken) => {

        const playlistSongs = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const playlistSongsData = await playlistSongs.json();

        setPlaylistSongs((oldSongs) => {
            return [...oldSongs, ...playlistSongsData.items]
        })

        if (playlistSongsData.next !== null) {

            getPlaylistSongs(playlistSongsData.next, authToken);
        }
    }

    const getPlaylistDetails = async () => {
        const playlistData = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { description, images, name, owner, tracks: { total } } = await playlistData.json();

        console.log(total);
        setPlaylistDetails({ description, images, name, owner, total });

    }


    useEffect(() => {
        setPlaylistSongs([]);
        getPlaylistSongs(url, authToken);
        getPlaylistDetails();
    }, [props.match.params.playlistId])

    return (
        <>
            <div className='playlist-container'>
                <PlayListHeader playlistDetail={playlistDetail} />
                {(playListSongs.length > 0 ?
                    <Table style={{ tableLayout: 'fixed' }} className='playlist__table' striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>play</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Album</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playListSongs.map(({ track }, idx) => {
                                return <SongItem key={idx} track={track} playlistId={props.match.params.playlistId} />
                            })}
                        </tbody>
                    </Table>
                    :
                    <div className='empty-playlist-container'>
                        <div className='empty-playlist-text'>
                            This Playlist is Currently Empty
                    </div>
                    </div>)}
            </div>
        </>
    )
}

export default PlayListDetail;
