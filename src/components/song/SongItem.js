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

    console.log(getArtist())

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
        console.log(devices)
        console.log(deviceId);
        console.log(spotify_uri);
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
                <Link to={`/playlist/${playlistId}`} onClick={playSong}>
                    <img src="https://img.icons8.com/material/24/000000/circled-play--v1.png" />
                </Link>
            </td>
            <td>{track.name}</td>
            <td>{getArtist()}</td>
            <td>{track.album.name}</td>
        </tr>
        // {/* <div className='song'>
        //     <div className='song__play-button'>

        //     </div>
        //     <div className='song__title'>

        //     </div>
        //     <div className='song-artist'>

        //     </div>
        //     <div className='song-album'>

        //     </div>
        // </div> */}
    )
}

export default SongItem;
