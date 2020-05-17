import React from 'react';

function ArtistPageHeader({ artist }) {
    return (
        <div className='artist-page-header-container'>
            <div className='artist-page-header__left'>
                <div className='artist-page-header__picture-container'>
                    {artist.images.length > 0 ? <div className='artist-page-header__picture'>
                        <img src={artist.images[0].url} />
                    </div> : <></>}
                </div>
            </div>
            <div className='artist-page-header__right'>
                <div className='artist-page-header-right__top'>
                    <div className='artist-page-header__verified'>
                        <div className='artist-page-header__text'>
                            <p>Artist</p>
                        </div>
                        <div className='artist-page-header__checkmark'>
                            <img src="https://img.icons8.com/flat_round/64/000000/checkmark.png" />
                        </div>
                    </div>
                </div>
                <div className='artist-page-header-right__bottom'>
                    <div className='artist-page-header__artist-name'>
                        <div>{artist.name}</div>
                    </div>
                    <div className='artist-page-header__followers'>
                        <p>FOLLOWERS</p>
                        <div>{artist.followers.total}</div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default ArtistPageHeader;
