import React, { useState, useEffect, useContext } from 'react';
import ArtistPageHeader from './ArtistPageHeader';
import { AppContext } from '../../context/appContext';
import './ArtistPage.css';
import TopSongs from './TopSongs';
import Albums from './Albums';
import SimiliarArtist from './SimiliarArtist';

function ArtistPage({ match }) {
    const [artist, setArtist] = useState({ images: [], followers: {} });
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [similiarArtist, setSimiliarArtist] = useState([]);
    const { authToken } = useContext(AppContext);

    async function getArtist() {
        const artistId = match.params.artistId;
        const artistData = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const artistDetails = await artistData.json();

        setArtist(artistDetails);

    }

    async function getArtistTopSongs() {
        const artistId = match.params.artistId;
        const songData = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=from_token`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { tracks } = await songData.json();
        setSongs(tracks);

    }

    async function getAlbums() {
        const artistId = match.params.artistId;
        const albumData = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { items } = await albumData.json();
        setAlbums(items);
    }

    async function getSimiliarArtist() {
        const artistId = match.params.artistId;
        const similiarArtistData = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { artists } = await similiarArtistData.json();
        setSimiliarArtist(artists)
        console.log(similiarArtist);
    }

    useEffect(() => {
        getArtist()
        getArtistTopSongs()
        getAlbums();
        getSimiliarArtist();
    }, [match.params.artistId])

    return (
        <>
            <ArtistPageHeader artist={artist} />
            <TopSongs songs={songs} />
            <Albums albums={albums} />
            <SimiliarArtist artists={similiarArtist} />
        </>

    )
}

export default ArtistPage;
