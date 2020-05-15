import React, { useState, useEffect, useContext } from 'react';
import { Form, Table, Card, CardColumns } from 'react-bootstrap';
import { AppContext } from '../../context/appContext';
import SongItem from '../song/SongItem';
import { Link } from 'react-router-dom';
import './searchPage.css'

function SearchPage() {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [artists, setArtist] = useState([]);
    const [queryNext, setQueryNext] = useState('');
    const { authToken } = useContext(AppContext);

    async function getSearchResults(e) {
        e.preventDefault();
        const encodedQuery = encodeURIComponent(query);
        console.log(encodedQuery);

        const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track,artist`;
        const searchResultsData = await fetch(url, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        })

        const { tracks, artists } = await searchResultsData.json()
        console.log(artists);
        setSongs(tracks.items);
        setArtist(artists.items);
        if (tracks.next !== null) {
            setQueryNext(tracks.next);
        }

    }

    async function loadMoreSongs(queryNext) {
        if (queryNext !== null) {
            const searchResultsData = await fetch(queryNext, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            })
            const { tracks: { items, next } } = await searchResultsData.json()
            setSongs((oldSongs) => {
                return [...oldSongs, ...items];
            })

            if (next !== null) setQueryNext(next);
        }


    }

    return (
        <div className='search-page__container'>
            <div className='search-page__form'>
                <Form onSubmit={getSearchResults} >
                    <Form.Group controlId="searchInput">
                        <Form.Control type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
                    </Form.Group>
                </Form>
            </div>
            <div className='search-page__results'>
                <div className='search-page__songs'>
                    <h2 className='songs__header'>Songs</h2>
                    <Table className='song-result__table' striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>play</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Album</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((track) => {
                                return <SongItem key={track.id} track={track} />
                            })}
                        </tbody>
                    </Table>
                    {songs.length > 0 ? (<div className='songs__loadMore'>
                        <button className='loadMore__button' onClick={() => loadMoreSongs(queryNext)}>Load More songs</button>
                    </div>) : <></>}
                </div>
                <div className='search-page__artists'>
                    <h2 className='artists__header'>Artist</h2>
                    <CardColumns>
                        {artists.map((artist) => {
                            return (
                                <Link key={artist.id} to={`/artist/${artist.id}`}>
                                    <Card bg='secondary' text='white'>
                                        <Card.Img variant="top" src={artist.images.length > 0 ? artist.images[1].url : ''} />
                                        <Card.Body>
                                            <Card.Title>{artist.name}</Card.Title>
                                            <Card.Text>
                                                Followers: {artist.followers.total}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Footer>
                                    </Card>
                                </Link>);
                        })}
                    </CardColumns>
                </div>>


            </div>
        </div>
    )
}

export default SearchPage;
