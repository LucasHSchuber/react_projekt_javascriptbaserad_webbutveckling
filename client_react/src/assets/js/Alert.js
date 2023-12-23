import React, { useEffect, useState } from 'react';

//shows alert message whenever a post is made, deleted or other user interactions
const Alert = ({ initialMessage, color, icon }) => {

    //alert
    const [showAlert, setShowAlert] = useState(true);
    const [message, setMessage] = useState(initialMessage);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);


    return showAlert ? (
        <div className='alert-wrapper' style={{ color: color }}>
            {icon && <span className='alert-icon'>{icon}</span>}
            <p>{message}</p>
        </div>
    ) : null;
};

export default Alert;
