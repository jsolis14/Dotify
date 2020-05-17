import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
function SongItem({ track, playlistId }) {

    const { authToken, setShowNotification, setShowAddToPlaylistForm } = useContext(AppContext);

    function getArtist() {
        const artists = track.artists;
        const artistArr = artists.map(artist => artist.name);
        return artistArr.join();
    }

    async function playSong() {
        const connectDevicesData = await fetch(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { devices } = await connectDevicesData.json();
        let deviceId;
        devices.forEach(device => {
            if (device.name === 'Dotify Player') {
                deviceId = device.id
            }
        });

        const spotify_uri = track.uri;

        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
    }

    async function addSongToQueue() {
        const connectDevicesData = await fetch(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { devices } = await connectDevicesData.json();
        let deviceId;
        devices.forEach(device => {
            if (device.name === 'Dotify Player') {
                deviceId = device.id
            }
        });

        const spotify_uri = track.uri;

        const res = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${spotify_uri}&device_id=${deviceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        setShowNotification({ show: true, name: track.name, artist: getArtist() });
    }


    return (
        <tr>
            <td>
                <div className='table-col-buttons'>
                    <a onClick={playSong}>
                        <img alt='play song' src={require('../../images/play-button.png')} />
                    </a>
                    <a onClick={addSongToQueue}>
                        <img src={require('../../images/add-to-queue.png')} />
                    </a>
                    <a>
                        <img onClick={() => setShowAddToPlaylistForm({ show: true, track: track.id })} src={require('../../images/add-to-playlist.png')} />
                    </a>
                </div>

            </td>
            <td>{track.name}</td>
            <td>{getArtist()}</td>
            <td>{track.album.name}</td>
        </tr>
    )
}

export default SongItem;
