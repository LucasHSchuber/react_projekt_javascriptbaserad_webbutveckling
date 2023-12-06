// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import fetchUser from '../../assets/js/fetchUser';



function AlAccountings() {


    const [accountings, setAccountings] = useState([]);
    
    const getAllAccountings = async () => {

        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch("http://localhost:5000/accountings", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log("Accounting data:", responseData);

                setAccountings(responseData);

            } else {
                const responseData = await response.json();
                console.log("Error:", responseData.message);
                console.log("Error:", response.status, response.statusText, response.message);

            }

        } catch (error) {
            console.log("Error fetching accountings: ", error.message);
            throw error;

        }
    }

    //load when mounted
    useEffect(() => {
        getAllAccountings();
    }, []);

    return (
        <main className='py-5'>

            <div className='allaccountingswrapper'>
                <h2>All accountings <br></br><span></span></h2>

                <div className='allaccountingsform'>
                    {accountings.map(acc => (
                        <div key={acc.id}>
                            <p>{acc.id}</p>
                            <p>{acc.companyName}</p>
                        </div>
                    ))}



                </div>

            </div>
        </main>
    );
}

export default AlAccountings;
