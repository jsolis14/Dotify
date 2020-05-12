import React from 'react';
import { NavLink } from 'react-router-dom'

function PLayListItem({ images, name, uri, id }) {

    return (
        <NavLink to={`/playlist/${id}`}>
            <li>{name}</li>
        </NavLink>
    )
};

export default PLayListItem;
