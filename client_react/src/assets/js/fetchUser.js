
// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//get the loggedin user
const fetchUser = async () => {
    try {
        const token = sessionStorage.getItem('token');

        const response = await fetch("http://localhost:5000/users/logedinuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("User data:", responseData);

            return {
                id: responseData.id,
                email: responseData.email,
                name: responseData.name,
                company: responseData.company
            };

        } else {
            const responseData = await response.json();
            console.log("Error:", responseData.message);
            console.log("Error:", response.status, response.statusText, response.message);
            throw new Error(responseData.message);

        }

    } catch (error) {
        console.log("Error fetching user: ", error.message);
        throw error;

    }
};


export default fetchUser;