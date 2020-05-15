import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
function SongItem({ track, playlistId }) {

    const { authToken } = useContext(AppContext);

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

    return (
        <tr>
            <td>
                <div className='table-col-buttons'>
                    <a onClick={playSong}>
                        <img alt='play song' src="https://img.icons8.com/material/24/000000/circled-play--v1.png" />
                    </a>
                    <a>
                        <img src="https://img.icons8.com/material-sharp/24/000000/add.png" />
                    </a>
                    <a>
                        <img src="https://img.icons8.com/ios-glyphs/30/000000/personal-video-recorder-menu.png" />
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
