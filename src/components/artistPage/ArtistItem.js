import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function ArtistItem({ artist }) {

    return (
        <Link className='artist-item-link' to={`/artist/${artist.id}`}>
            <div className='siliar-artist-card-container'>
                <Card style={{ height: '400px', overflow: "hidden" }}>
                    <Card.Img style={{ height: '275px', width: '100%' }} bsPrefix='artist-pic__prefix' variant="top" src={artist.images[1].url} />
                    <Card.Body >
                        <Card.Title style={{ color: "black" }}> {artist.name}</Card.Title>
                        <Card.Text style={{ color: "black" }}>
                            {`Followers: ${artist.followers.total}`}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div >
        </Link>
    )
}

export default ArtistItem;
