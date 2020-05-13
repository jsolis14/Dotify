import React from 'react';
import { NavLink } from 'react-router-dom'

function PLayListItem({ images, name, uri, id }) {

    return (
        <NavLink exact to={`/playlist/${id}`}>
            <div>{name}</div>
        </NavLink>
    )
};

export default PLayListItem;
