import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import './notification.css';

function Notification() {
    const { setShowNotification, showNotification } = useContext(AppContext);

    function closeNotification() {
        setTimeout(() => {
            setShowNotification({ show: false, name: '', artist: '' })
        }, 2000);
    }

    useEffect(() => {
        closeNotification();
    })

    return (
        <div className='notification-popup-container'>
            <div className='notification-popup__text-container'>
                <p>{`${showNotification.name} by ${showNotification.artist} was added to queue`}</p>
            </div>
        </div>
    )
}

export default Notification;
