import React from 'react';
import { Table, Card, CardColumns } from 'react-bootstrap';

function AlbumItem({ album }) {

    function getArtist() {
        const artists = album.artists;
        const artistArr = artists.map(artist => artist.name);
        return artistArr.join();
    }

    return (
        <div className='album-card-container'>
            <Card style={{ height: '350px' }}>
                <Card.Img variant="top" src={album.images[1].url} />
                <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                        {getArtist()}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AlbumItem;
