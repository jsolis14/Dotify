import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PlaylistCard({ playlist }) {

    return (
        <Link className='artist-item-link' to={`/playlist/${playlist.id}`}>
            <div className='siliar-artist-card-container'>
                <Card style={{ height: '400px', overflow: "hidden" }}>
                    <Card.Img style={{ height: '275px', width: '100%' }} bsPrefix='artist-pic__prefix' variant="top" src={playlist.images[0].url} />
                    <Card.Body >
                        <Card.Title style={{ color: "black" }}> {playlist.name}</Card.Title>
                        <Card.Text style={{ color: "black" }}>
                            {`Followers: 0`}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div >
        </Link>
    )
}
