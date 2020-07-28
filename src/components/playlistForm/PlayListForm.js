import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/appContext';
import { Modal, Form, Button } from 'react-bootstrap';
import './playlistForm.css';
export default function PlaylistForm() {
    const { authToken, setShowCreatePlaylist, userId, showCreatePlaylist, playlists, setPlaylists } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [privacy, setPrivacy] = useState(true);
    const [description, setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const playlistPost = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            body: JSON.stringify({ name: title, public: privacy, description }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if (playlistPost.ok) {
            //maybe update playlist length here;
            setShowCreatePlaylist(false);
            const playlistData = await playlistPost.json()

            setPlaylists([playlistData, ...playlists]);
        }

    }

    function closeForm() {
        setShowCreatePlaylist(false);
    }

    return (
        <Modal variant='dark' show={showCreatePlaylist} onHide={closeForm}>
            <Modal.Header closeButton>
                <Modal.Title>Add a PLaylist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='playlist-form'>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeForm}>
                    Close
                  </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Save Changes
                  </Button>
            </Modal.Footer>
        </Modal>
    )
}
