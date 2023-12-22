// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchUser from '../../assets/js/fetchUser';
import chatbotImg from '../../assets/images/chatbot.png';
import Chatbot from '../../assets/js/Chatbot';
import Chart from '../../assets/js/Chart';
import PageAuth from '../../assets/js/pageAuth';


function HomePage() {

    PageAuth();

    const [name, setUserName] = useState(null);
    const [company, setUserCompany] = useState(null);
    const [length, setNumberofAccountings] = useState("");
    const [number, setNumberofCompanies] = useState("");



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



    //get the users accountings
    const getAllAccountings = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userid');
        console.log(userId);

        try {
            const response = await fetch(`http://localhost:5000/accountings/acc?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Accounting data:", responseData);

                // Store the length of the array or object in a variable
                const numberOfAccountings = Array.isArray(responseData)
                    ? responseData.length
                    : Object.keys(responseData).length;

                setNumberofAccountings(numberOfAccountings);

                const companyCounts = {};

                if (Array.isArray(responseData)) {
                    responseData.forEach(post => {
                        const companyName = post.companyName;

                        // Update the count for the specific company name
                        companyCounts[companyName] = (companyCounts[companyName] || 0) + 1;
                    });
                }

                setNumberofCompanies(Object.keys(companyCounts).length);
                console.log("Number of unique company names:", Object.keys(companyCounts).length);
                console.log("Number of accountings:", numberOfAccountings);

            } else {
                const responseData = await response.json();
                console.log("Error:", responseData.message);
                console.log("Error:", response.status, response.statusText, response.message);
            }

        } catch (error) {
            console.log("Error fetching accountings: ", error.message);
            throw error;
        }
    };


    useEffect(() => {
        getAllAccountings();
    }, []);




    return (
        <main className='py-5'>
            <div className='homepage'>

                <h1>Welcome <br></br><span>{name}</span></h1>
                <h6>Company: {company}</h6>

                <div className='hr'>
                    <hr ></hr>
                </div>

                <div className='data-wrapper '>
                    <div className='data-box'>
                        <p>
                            Amount of accountings
                        </p>
                        <div className="circle ">
                            <div>{length}</div>
                        </div>
                    </div>

                    <div className='data-box'>
                        <p>
                            Amount of companies
                        </p>
                        <div className="circle ">
                            <div>{number}</div>
                        </div>
                    </div>
                </div>

                <Chart />

                <Chatbot />

            </div>

        </main >


    );
}

export default HomePage;
