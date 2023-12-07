// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function AlAccountings() {


    const [accountings, setAccountings] = useState([]);

    const [searchString, setSearchString] = useState("");
    const [searchResponse, setSearchResponse] = useState("");


    const getAllAccountings = async () => {

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userid'); // Assuming userId is stored in session storage


        try {
            const response = await fetch(`http://localhost:5000/accountings?id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                // console.log("Accounting data:", responseData);
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


    // const getSearch = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/accountings/search?searchString=${searchString}`);
    //         console.log(response.data);
    //         setSearchResponse(response.data);
    //     } catch (error) {
    //         console.error("error fetching search string:" + error);
    //     }
    // }



    //load when mounted
    useEffect(() => {
        getAllAccountings();
    }, []);


    useEffect(() => {

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/accountings/search?searchString=${searchString}`);
                console.log(response.data);
                setSearchResponse(response.data);
            } catch (error) {
                console.error("error fetching search string:" + error);
            }
        };

        if (searchString.trim() !== "") {
            fetchSearchResults();
        } else {
            setSearchResponse([]);
        }

    }, [searchString])


    const editAccounting = async (id) => {
        console.log("Clicked: " + id);
    }

    return (
        <main className='py-5'>

            <div className='allaccountingswrapper'>
                <h2 className='pb-5'>All accountings </h2>



                <div className='allaccountingstable'>

                    <nav className="navbar mb-4">
                        <form className="form-inline">
                            <input
                                className="form-control input mr-sm-2"
                                type="search"
                                placeholder="Search for date and company"
                                aria-label="Search"
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            />

                            {/* <select
                                className="form-control filter mr-sm-2"
                                type="select"
                                placeholder="Year"
                                aria-label="select"
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            >
                                <option >Month</option>
                                <option >Januaru</option>
                                <option >February</option>
                            </select> */}

                        </form>
                    </nav>


                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Company</th>
                                <th>Comment</th>
                                <th>Plan</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Redigera</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResponse.length > 0 ? searchResponse : accountings).map(accounting => (
                                <React.Fragment key={accounting.id}>
                                    {accounting.entries.map((entry, index, array) => (
                                        <tr key={entry._id} style={index === array.length - 1 ? { borderBottom: '1px solid #ddd', marginBottom: '20px' } : {}}>
                                            {/* Första cellen i varje rad */}
                                            {index === 0 && (
                                                <>
                                                    <td>{accounting.date.substring(0, 10)}</td>
                                                    <td>
                                                        {accounting.companyName.length > 10
                                                            ? accounting.companyName.substring(0, 10) + "..."
                                                            : accounting.companyName}
                                                    </td>
                                                    <td>
                                                        {accounting.comment.length > 10
                                                            ? accounting.comment.substring(0, 10) + "..."
                                                            : accounting.comment}
                                                    </td>
                                                </>
                                            )}

                                            {/* Dataceller för varje inlägg */}
                                            <td>{entry.plan}</td>
                                            <td>{entry.debit}</td>
                                            <td>{entry.credit}</td>

                                            {/* Sista cellen i varje rad */}
                                            {index === 0 && (
                                                <td>
                                                    <Button onClick={() => editAccounting(accounting.id)}>Edit</Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>






                </div>

            </div>
        </main>
    );
}

export default AlAccountings;
