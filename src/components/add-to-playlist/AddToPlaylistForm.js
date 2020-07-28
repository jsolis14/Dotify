import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import { Modal, Form, Button } from 'react-bootstrap';
import './addtoplaylistform.css';
export default function AddToPlaylistForm() {
    const { showAddToPlaylistForm, setShowAddToPlaylistForm, authToken } = useContext(AppContext);
    const [playlists, setPlaylists] = useState([]);
    const [numberOfPlaylist, setNumberOfPlaylist] = useState([]);
    const [checkedPlaylists, setCheckedPlaylists] = useState([]);

    const handleClose = () => setShowAddToPlaylistForm({ show: false, track: '' });

    const url = 'https://api.spotify.com/v1/me/playlists';
    const getUserPlaylists = async (url, authToken) => {
        const userPlaylists = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        if (userPlaylists.status === 401) {
            localStorage.removeItem('SPOTIFY_ACCESS');
            localStorage.removeItem('_spharmony_device_id');
        }

        const userPlaylistsData = await userPlaylists.json();

        setPlaylists((oldPlaylist) => {
            return [...oldPlaylist, ...userPlaylistsData.items]
        });

        setNumberOfPlaylist((oldNum) => {
            return oldNum + userPlaylistsData.items.length;
        })

        if (userPlaylistsData.next !== null) {
            getUserPlaylists(userPlaylistsData.next, authToken);
        }

    }

    async function handleSubmit() {


        //map to array of fetch requests
        const track = showAddToPlaylistForm.track;
        const fetches = checkedPlaylists.map(playlist => {
            return (
                fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks?uris=spotify:track:${track}`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                })
            )
        })

        const responses = await Promise.all(fetches);


        handleClose();
    }

    function toggleCheckBox(e, idx) {

        const checkedIdx = checkedPlaylists.indexOf(e.target.value)
        if (e.target.checked && checkedIdx === -1) {

            setCheckedPlaylists([...checkedPlaylists, e.target.value])
        } else if (!e.target.checked && checkedIdx > -1) {

            setCheckedPlaylists([...checkedPlaylists.slice(0, checkedIdx), ...checkedPlaylists.slice(checkedIdx + 1, checkedPlaylists.length)])
        }


    }

    useEffect(() => {
        getUserPlaylists(url, authToken)
    }, [])

    return (
        <>
            <Modal variant='dark' show={showAddToPlaylistForm.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Song To Your Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {playlists.map((playlist, idx) => {
                            return (
                                <Form.Check type="switch" key={idx} id={playlist.id} value={playlist.id} onChange={(e) => toggleCheckBox(e, idx)} label={playlist.name} />
                            )
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                  </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Save Changes
                  </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
