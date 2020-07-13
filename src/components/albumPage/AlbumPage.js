import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/appContext';
import Table from 'react-bootstrap/Table';
import SongItem from '../song/SongItem';
import './albumPage.css';

export default function AlbumPage(props) {
    const { authToken } = useContext(AppContext);
    const album_id = props.match.params.albumId;
    const [album, setAlbum] = useState({ tracks: { items: [] }, images: [], artists: [], album_type: '' })

    function getArtist() {
        const artists = album.artists;
        const artistArr = artists.map(artist => artist.name);
        return artistArr.join();
    }

    const getAlbum = async () => {
        const url = `https://api.spotify.com/v1/albums/${album_id}`
        const data = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const album = await data.json();
        console.log(album)
        setAlbum(album)
    }

    useEffect(() => {
        if (album.tracks.items.length === 0) {
            getAlbum()
        }

    }, [props.match.params.playlistId])

    return (
        <>
            <div className='album-page__top'>
                <div className='album-page__top-left'>
                    {album.images.length > 0 ? <img src={`${album.images[1].url}`} /> : <></>}
                </div>
                <div className='album-page__top-right'>
                    <div className='album-page__album-type'>
                        {album.album_type.toUpperCase()}
                    </div>
                    <div className='album-page__title'>
                        {album.name}
                    </div>
                    <div className=''>
                        {`By ${getArtist()}`}
                    </div>
                    <div className=''>
                        {`${album.release_date} ᛫ ${album.total_tracks} songs `}
                    </div>
                </div>
            </div>
            <div className='playlist-container'>
                {/* <PlayListHeader playlistDetail={playlistDetail} /> */}
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
                        {album.tracks.items.length > 0 ?
                            album.tracks.items.map(track => {
                                console.log(track)
                                return <SongItem key={track.id} track={track} playlistId={props.match.params.playlistId} fromAlbum={true} />
                            }) : <></>}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
