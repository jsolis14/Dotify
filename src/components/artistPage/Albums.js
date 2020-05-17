
import React, { useState } from "react";
import ItemsCarousel from 'react-items-carousel';
import AlbumItem from './AlbumItem';
function Albums({ albums }) {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <>
            <div className='artist-page__header-container'>
                <h1 className='artist-page__header-content'>Albums</h1>
            </div>
            <div style={{ "padding": "15px 60px", "maxWidth": "100%", "maxHeight": "100%", "margin": "0px" }}>
                <ItemsCarousel
                    infiniteLoop={false}
                    gutter={12}
                    activePosition={'center'}
                    chevronWidth={60}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={5}
                    slidesToScroll={5}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    activeItemIndex={activeItemIndex}
                    requestToChangeActive={value => setActiveItemIndex(value)}
                    rightChevron={'>'}
                    leftChevron={'<'}>
                    {albums.map(album => {
                        return <AlbumItem key={album.id} album={album} />
                    })}
                </ItemsCarousel>
            </div>
        </>
    );
};


export default Albums;
