import React from 'react';
import { Table, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AlbumItem({ album }) {

    function getArtist() {
        const artists = album.artists;
        const artistArr = artists.map(artist => artist.name);
        return artistArr.join();
    }

    return (
        <div className='album-card-container'>
            <Link to={`/album/${album.id}`}>
                <Card style={{ height: '410px', overflow: "hidden" }}>
                    <Card.Img style={{ height: '275px', width: '100%' }} variant="top" src={album.images[1].url} />
                    <Card.Body>
                        <Card.Title style={{ color: "black" }} > {album.name}</Card.Title>
                        <Card.Text style={{ color: "black" }} >
                            {getArtist()}
                        </Card.Text>
                        <Card.Text style={{ color: "black" }} >
                            {album.album_type}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}

export default AlbumItem;
