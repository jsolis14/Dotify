import React from 'react';

function ArtistPageHeader({ artist }) {
    return (
        <div className='artist-page-header-container'>
            <div className='artist-page__header'>
                {artist.images.length > 0 ? <div className='artist-page__picture'>
                    <img src={artist.images[0].url} />
                </div> : <></>}

                <div className='artist-page__above-picture'>
                    <div className='artist-page__left'>
                        <div className='artist-page__text-verified'>
                            <p>Artist</p>
                            <div className='artist-page__verified'>
                                <img src="https://img.icons8.com/flat_round/64/000000/checkmark.png" />
                            </div>
                        </div>

                        <div className='artist-page__name'>
                            <span>{artist.name}</span>
                        </div>
                    </div>
                </div>
                <div className='artist-page__right'>
                    <p>FOLLOWERS</p>
                    <div>{artist.followers.total}</div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPageHeader;
