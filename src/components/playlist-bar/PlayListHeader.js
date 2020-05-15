import React from 'react';
import './PlayListHeader.css';

function PlayListHeader({ playlistDetail }) {
    console.log(playlistDetail.images);
    return (
        <div className='playlist-header-container'>
            <div className='playlist-header__left'>
                <img src={(playlistDetail.images.length > 0) ? playlistDetail.images[0].url : ''}></img>
            </div>>
            <div className='playlist-header__right'>
                <span>PLAYLIST</span>
                <h1 className='playlist-header__name'>{playlistDetail.name}</h1>
                <p>{playlistDetail.description}</p>
                <p>{`Created by ${playlistDetail.owner.display_name}, ${playlistDetail.total} songs`}</p>
            </div>
        </div>)
}

export default PlayListHeader;
