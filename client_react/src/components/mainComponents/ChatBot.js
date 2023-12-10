
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';

function Footer() {

    const logoutUser = () => {
        // Remove the token from sessionStorage
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('userid');
        console.log(token + " has been removed from session storage"); 
        console.log(user + " has been removed from session storage"); 
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userid');
        
    }
    return (
        <main className="d-flex chatbot">

            <div>

                
            </div>

        </main>
    );
}

export default Footer;
