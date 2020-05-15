import React from 'react';
import { NavLink } from 'react-router-dom'

function PLayListItem({ name, id }) {

    return (
        <div className='playlist-link__container'>
            <NavLink className='playlist__link' exact to={`/playlist/${id}`}>
                <div>{name}</div>
            </NavLink>
        </div>

    )
};

export default PLayListItem;
