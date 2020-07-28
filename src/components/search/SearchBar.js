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
                pathname: '/search',
                state: { query }
            }} /> : <></>}
        </div>

    )
}
