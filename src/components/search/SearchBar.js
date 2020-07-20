import React, { useState, useEffect, useContext } from 'react';
import { Form, Table, Card, CardColumns, Button } from 'react-bootstrap';
import { AppContext } from '../../context/appContext';
import SongItem from '../song/SongItem';
import { Link, Redirect } from 'react-router-dom';
import './searchPage.css'

export default function SearchBar() {


    const [query, setQuery] = useState('');
    const [renderSearch, setRenderSearch] = useState(false);
    const [songs, setSongs] = useState([]);
    const [artists, setArtist] = useState([]);
    const [queryNext, setQueryNext] = useState('');
    const { authToken } = useContext(AppContext);
    // useEffect(() => {

    // }, [query])

    // async function getSearchResults(e) {
    //     e.preventDefault();
    //     const encodedQuery = encodeURIComponent(query);
    //     console.log(encodedQuery);

    //     const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track,artist`;
    //     const searchResultsData = await fetch(url, {
    //         headers: { 'Authorization': `Bearer ${authToken}` }
    //     })

    //     if (searchResultsData.ok) {
    //         const { tracks, artists } = await searchResultsData.json()
    //         console.log(artists);
    //         setSongs(tracks.items);
    //         setArtist(artists.items);
    //         if (tracks.next !== null) {
    //             setQueryNext(tracks.next);
    //         }
    //         setRenderSearch(true)
    //     } else {
    //         return
    //     }
    // }

    // async function loadMoreSongs(queryNext) {
    //     if (queryNext !== null) {
    //         const searchResultsData = await fetch(queryNext, {
    //             headers: { 'Authorization': `Bearer ${authToken}` }
    //         })
    //         const { tracks: { items, next } } = await searchResultsData.json()
    //         setSongs((oldSongs) => {
    //             return [...oldSongs, ...items];
    //         })

    //         if (next !== null) setQueryNext(next);
    //     }


    // }

    function formSubmit(e) {
        e.preventDefault()
        setRenderSearch(true)
    }
    function searchChange(e) {
        setQuery(e.target.value)
        setRenderSearch(false)
    }
    return (
        <div className='search-page__form'>
            <Form inline onSubmit={formSubmit}>
                <Form.Group controlId="searchInput">
                    <Form.Control type="text" onChange={searchChange} placeholder="Search" />
                </Form.Group>
            </Form>
            {renderSearch ? <Redirect to={{
                pathname: 'search',
                state: { query }
            }} /> : <></>}
        </div>

    )
}
