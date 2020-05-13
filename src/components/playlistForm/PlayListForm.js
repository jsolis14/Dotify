import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import { Form, Button } from 'react-bootstrap';
import './playlistForm.css';
export default function PlaylistForm() {
    const { authToken, showCreatePlaylist, setShowCreatePlaylist, userId } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [privacy, setPrivacy] = useState(true);
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(title);
        console.log(privacy);
        console.log(description);
        const playlistPost = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            body: JSON.stringify({ name: title, public: privacy, description }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (playlistPost.ok) {
            const playlist = await playlistPost.json();
            setShowCreatePlaylist(false);
        }

    }

    function closeForm() {
        setShowCreatePlaylist(false);
    }

    return (
        <div className='playlist-popup'>
            <div className='playlist-popup__container'>
                <div className='playlist-form__close'>
                    <a onClick={closeForm}>
                        <img src="https://img.icons8.com/dotty/80/000000/close-window.png" />
                    </a>
                </div>
                <div className='playlist-form-container' >
                    <div>
                        <h2>Add a PlayList</h2>
                    </div>
                    <Form className='playlist-form' onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Playlist Title</Form.Label>
                            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} name='playlistTitle' type="text" placeholder="Enter the name of the playlist" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Please Select A Privacy Setting For Your Playlist</Form.Label>
                            <Form.Control onChange={(e) => setPrivacy(e.target.value)} name='privacySetting' as="select">
                                <option value='true'>Public</option>
                                <option value='false'>Private</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description For PLaylist</Form.Label>
                            <Form.Control onChange={(e) => setDescription(e.target.value)} name='description' as="textarea" rows="3" />
                        </Form.Group>
                        <Button type="submit">Create Playlist</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
