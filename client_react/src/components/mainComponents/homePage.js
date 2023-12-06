// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchUser from '../../assets/js/fetchUser';

function HomePage() {

    const [name, setUserName] = useState(null);
    const [company, setUserCompany] = useState(null);


    // useEffect hook to run fetchUser when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                setUserName(userData.name);
                setUserCompany(userData.company);
            } catch (error) {
                console.error("Error in fetchData:", error.message);
                // Handle error as needed
            }
        };

        fetchData();
    }, []); // The empty dependency array [] ensures that this effect runs only once when the component mounts



    return (
        <main className='py-5'>
            <div className='homepage'>

                <h1>Welcome <br></br><span>{name}</span></h1>
                <h6>Company: {company}</h6>

            </div>
        </main>
    );
}

export default HomePage;
