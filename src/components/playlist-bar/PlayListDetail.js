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
                <Table className='playlist__table' striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>play</th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playListSongs.map(({ track }) => {
                            return <SongItem key={track.id} track={track} playlistId={props.match.params.playlistId} />
                        })}
                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default PlayListDetail;
