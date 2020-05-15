import React, { useState } from "react";
import ItemsCarousel from 'react-items-carousel';
import ArtistItem from './ArtistItem';

function SimiliarArtist({ artists }) {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return (
        <>
            <div className='artist-page__header-container'>
                <h1 className='artist-page__header-content'>Similiar Artist</h1>
            </div>
            <div style={{ "padding": "15px 60px", "maxWidth": 1000, "margin": "0px auto" }}>
                <ItemsCarousel
                    infiniteLoop={false}
                    gutter={12}
                    activePosition={'center'}
                    chevronWidth={60}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={4}
                    slidesToScroll={4}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    activeItemIndex={activeItemIndex}
                    requestToChangeActive={value => setActiveItemIndex(value)}
                    rightChevron={'>'}
                    leftChevron={'<'}>
                    {artists.map(artist => {
                        return <ArtistItem key={artist.id} artist={artist} />
                    })}
                </ItemsCarousel>
            </div>
        </>
    )
}

export default SimiliarArtist;
