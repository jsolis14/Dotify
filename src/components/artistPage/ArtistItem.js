import React from 'react';
import { Card } from 'react-bootstrap';

function ArtistItem({ artist }) {

    return (
        <div className='siliar-artist-card-container'>
            <Card style={{ height: '350px' }}>
                <Card.Img variant="top" src={artist.images[1].url} />
                <Card.Body >
                    <Card.Title>{artist.name}</Card.Title>
                    <Card.Text>
                        {`Followers: ${artist.followers.total}`}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div >
    )
}

export default ArtistItem;
