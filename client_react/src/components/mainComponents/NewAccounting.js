// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import fetchUser from '../../assets/js/fetchUser';



function NewAccounting() {

    const [accountingsCount, setAccountingsCount] = useState(1);
    const [id, setId] = useState(0);
    const [userId, setUserId] = useState("");
    const [date, setDate] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [comment, setComment] = useState("");
    const [entries, setEntries] = useState([{ plan: "", debit: 0, credit: 0 }]);


    const handleAddAccounting = () => {
        setAccountingsCount(accountingsCount + 1);
        // Initialize a new entry with default values
        const newEntry = { plan: "", debit: 0, credit: 0 };
        // Add the new entry to the entries array
        setEntries([...entries, newEntry]);
    };

    const handleRemoveAccounting = () => {
        if (accountingsCount > 1) {
            setAccountingsCount(accountingsCount - 1);
            // Remove the last entry
            setEntries(entries.slice(0, -1));
        } else {
            console.log("Cannot remove all fields")
        }
    };

    const handleEntryChange = (index, field, value) => {
        const updatedEntries = [...entries];
        // updatedEntries[index][field] = value;
        updatedEntries[index][field] = field !== 'plan' ? parseFloat(value) : value;
        setEntries(updatedEntries);
    };

    const fetchData = async () => {
        try {
            const userData = await fetchUser();
            setUserId(userData.id);
        } catch (error) {
            console.error("Error in fetchData:", error.message);
            // Handle error as needed
        }
    };

    const createAccounting = async () => {

        const token = sessionStorage.getItem("token");
        const date = new Date().toISOString();

        await fetchData();
        await getLastId();

        const userId = 1;


        const data = {
            id: id,
            userId: userId,
            date: date,
            companyName: companyName,
            comment: comment,
            entries: entries
        }

        console.log(data);

        try {
            const response = await fetch("http://localhost:5000/accountings/newaccounting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Data stored in mongodb");

            } else {
                const responseData = await response.json();
                console.log("Error when storing data in mongodb:", responseData.message);
                console.log("Error when storing data in mongodb:", response.status, response.statusText, response.message);
                // Handle error message on the front end, for example:
                // setError(responseData.message);
            }

        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    }

    //gettign the last id from users collection in mongodb and adding 1 to new user
    const getLastId = async () => {
        try {
            const response = await axios.get('http://localhost:5000/accountings');
            const accountings = response.data;

            if (accountings && accountings.length > 0) {
                const lastId = accountings[accountings.length - 1].id;
                const newId = lastId + 1;
                console.log('Next available ID:', newId);
                setId(newId);
            } else {
                console.log('No existing accountings. Setting ID to 1.');
                setId(1);
            }
        } catch (error) {
            console.error('Error getting accountings:', error.message);
            // Handle error more gracefully, e.g., display an error message to the user
        }
    };


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


    // // useEffect hook to run fetchUser when the component mounts
    // useEffect(() => {
    //     const fetchDataAndSetCompanyName = async () => {
    //         try {
    //             const userData = await getAllAccountings();
    //             setCompanyNamePrint(userData.companyName);

    //         } catch (error) {
    //             console.error("Error in fetchData:", error.message);
    //             // Handle error as needed
    //         }
    //     };

    //     fetchDataAndSetCompanyName();
    // }, []); // The empty dependency array [] ensures that this effect runs only once when the component mounts




    return (
        <main className='py-5'>

            <div className='newaccountingwrapper'>
                <h2>New accounting <br></br><span></span></h2>


                <div className='newaccountingform'>

                    <h5>Add new:</h5>
                    <Form className='newaccountingform'>

                        {/* Date */}
                        <Form.Group controlId="formName">
                            <Form.Control
                                className='input short'
                                type="date"
                                placeholder="Date"
                                name="date"
                                onChange={(e) => setDate(e.target.value)}
                                // onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* Company */}
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                className='input short'
                                type="text"
                                placeholder="Company name"
                                name="company"
                                id="test"
                                // value={email}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* comment */}
                        <Form.Group controlId="formCompany">
                            <Form.Control
                                className='input short'
                                type="text"
                                placeholder="Comment"
                                name="comment"
                                id="test2"
                                // value={company}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </Form.Group>


                        {[...Array(accountingsCount)].map((_, index) => (
                            <div key={index} className='accountings' id={`accId${index}`}>
                                <Form.Group controlId={`formCompany${index}`}>
                                    <Form.Control
                                        as="select"
                                        className='input select'
                                        name={`plan${index}`}
                                        value={entries[index] ? entries[index].plan : ""}
                                        onChange={(e) => handleEntryChange(index, "plan", e.target.value)}
                                        required

                                    >
                                        <option selected value="">Plan</option>
                                        <option value="1930">1930 - bank</option>
                                        <option value="2640">2640 ingående moms</option>
                                        <option value="3010">3010 - försäljning</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId={`formCompany${index}`}>
                                    <Form.Control
                                        className='input'
                                        type="number"
                                        placeholder={`Debit ${index + 1}`}
                                        name={`debit${index}`}
                                        value={entries[index].debit}
                                        onChange={(e) => handleEntryChange(index, "debit", e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId={`formCompany${index}`}>
                                    <Form.Control
                                        className='input'
                                        type="number"
                                        placeholder={`Credit ${index + 1}`}
                                        name={`credit${index}`}
                                        value={entries[index].credit}
                                        onChange={(e) => handleEntryChange(index, "credit", e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Button to add more accountings */}
                                <Button
                                    className='test'
                                    onClick={handleAddAccounting}
                                    type='button'
                                >
                                    +
                                </Button>
                                <Button
                                    className='test'
                                    onClick={handleRemoveAccounting}
                                    type='button'
                                >
                                    -
                                </Button>
                            </div>
                        ))}

                    </Form>

                </div>

                <div className='calcAccouting'>
                    <h6>Sum debet:<span></span></h6>
                    <h6>Sum kredit:<span></span></h6>
                    <h6 className='py-3'>Difference: <span></span></h6>
                </div>


                <Button
                    type='button'
                    className='button mt-4'
                    // value={}
                    // onChange={}
                    onClick={createAccounting}
                >
                    Account
                </Button>

                
            </div>
        </main>
    );
}

export default NewAccounting;
