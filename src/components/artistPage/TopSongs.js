import React from 'react'
import { Table } from 'react-bootstrap';
import SongItem from '../song/SongItem';
function TopSongs({ songs }) {

    return (
        <div className='top-songs_container'>
            <h1>Artist's Top Songs</h1>
            <Table className='song-result__table' striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>play</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((track) => {
                        return <SongItem key={track.id} track={track} />
                    })}
                </tbody>
            </Table>
        </div>


    )
}

export default TopSongs;
