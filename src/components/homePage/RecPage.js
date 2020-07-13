import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import PlayListBar from '../playlist-bar/PlayListBar';
import { Link } from 'react-router-dom';
import ItemsCarousel from 'react-items-carousel';
import PlaylistCard from './PlaylistCard';
import AlbumItem from '../artistPage/AlbumItem';

export default function RecPage() {
    const { authToken } = useContext(AppContext);
    const [recPlaylists, setRecPlaylists] = useState([])
    const [recAlbums, setRecAlbums] = useState([])
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [activeItemIndexAlbum, setActiveItemIndexAlbum] = useState(0);
    const chevronWidth = 40;

    async function getRecPlaylists() {
        const url = 'https://api.spotify.com/v1/browse/featured-playlists'
        console.log(authToken)
        const data = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { playlists } = await data.json()
        setRecPlaylists(playlists.items)

    }

    async function getRecAlbums() {
        const url = 'https://api.spotify.com/v1/browse/new-releases'
        console.log(authToken)
        const data = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })

        const { albums } = await data.json()
        setRecAlbums(albums.items)
        console.log(albums.items)
    }

    useEffect(() => {
        if (recPlaylists.length === 0) {
            getRecPlaylists()

        }
        if (recAlbums.length === 0) {
            getRecAlbums()
        }
    })

    return (
        <div>
            <div style={{ "padding": "15px 60px", "maxWidth": "100%", "maxHeight": "100%", "margin": "0px" }} >
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
                    {
                        recPlaylists.map(playlist => {
                            return <PlaylistCard key={playlist.id} playlist={playlist} />
                        })
                    }
                </ItemsCarousel>
            </div>
            <div style={{ "padding": "15px 60px", "maxWidth": "100%", "maxHeight": "100%", "margin": "0px" }} >
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
                    activeItemIndex={activeItemIndexAlbum}
                    requestToChangeActive={value => setActiveItemIndexAlbum(value)}
                    rightChevron={'>'}
                    leftChevron={'<'}>
                    {recAlbums.map(album => {
                        return <AlbumItem key={album.id} album={album} />
                    })}
                </ItemsCarousel>
            </div>
        </div>
    )
}
