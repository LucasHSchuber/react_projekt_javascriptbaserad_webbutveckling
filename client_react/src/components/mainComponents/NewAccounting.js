// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import fetchUser from '../../assets/js/fetchUser';
import planOptions from '../../assets/js/planOptions';
import Chatbot from '../../assets/js/Chatbot';
import Alert from '../../assets/js/Alert';



function NewAccounting() {

    //alert
    const [showAlert, setShowAlert] = useState(false);


    const [accountingsCount, setAccountingsCount] = useState(1);
    const [id, setId] = useState(0);
    // const [userId, setUserId] = useState("");
    const [date, setDate] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [comment, setComment] = useState("");
    const [invoiceNmbr, setInvoiceNmbr] = useState("");
    const [entries, setEntries] = useState([{ plan: "", debit: 0, credit: 0 }]);

    const [sumDebit, setSumDebit] = useState(0);
    const [sumCredit, setSumCredit] = useState(0);

    useEffect(() => {
        getLastId();
    }, []); // Fetch the last ID when the component mounts




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
        const numericValue = parseFloat(value);

        if (!isNaN(numericValue)) {
            // If the input value is a valid number, update the entry
            updatedEntries[index][field] = field !== 'plan' ? numericValue : value;
        } else {
            // If the input value is NaN, set the entry value to 0
            updatedEntries[index][field] = "";
        }

        setEntries(updatedEntries);
    };


    const fetchData = async () => {
        try {
            const userData = await fetchUser();
            // setUserId(userData.id);
        } catch (error) {
            console.error("Error in fetchData:", error.message);
            // Handle error as needed
        }
    };

    const createAccounting = async () => {

        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userid");

        await getLastId();
        const idset = id;
        let created_at = new Date();

        const data = {
            id: idset,
            userId: userId,
            date: date,
            companyName: companyName,
            comment: comment,
            invoiceNmbr: invoiceNmbr,
            created_at: created_at,
            entries: entries
        }

        console.log(data);

        if (date === "") {
            document.getElementById("date").style.borderColor = "red";
            document.getElementById("date").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("date").style.borderColor = "";
            document.getElementById("date").style.backgroundColor = "";
        }

        if (!entries[0].plan) {
            document.getElementById(`plan${0}`).style.borderColor = "red";
            document.getElementById(`plan${0}`).style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById(`plan${0}`).style.borderColor = "";
            document.getElementById(`plan${0}`).style.backgroundColor = "";
        }

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
                setShowAlert(true);

            } else {
                const responseData = await response.json();
                console.log("Error when storing data in mongodb:", responseData);
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

            const lastId = accountings.length > 0 ? accountings[accountings.length - 1].id : 0;
            const newId = lastId + 1;
            setId(newId);

        } catch (error) {
            console.error('Error getting accountings:', error.message);
            // Handle error more gracefully, e.g., display an error message to the user
        }
    };


    useEffect(() => {
        // In the reduce function used in the useEffect hook, acc stands for accumulator, and entry represents each element in the entries array.
        const calculatedSumDebit = entries.reduce((acc, entry) => acc + entry.debit, 0);
        const calculatedSumCredit = entries.reduce((acc, entry) => acc + entry.credit, 0);

        // Update state with the calculated sums
        setSumDebit(calculatedSumDebit);
        setSumCredit(calculatedSumCredit);

        if (calculatedSumDebit - calculatedSumCredit === 0 && entries.length > 0) {
            console.log("Calculation correct!")
            document.getElementById("check").style.display = "block";
            document.getElementById("red").style.color = "";
        } else {
            document.getElementById("check").style.display = "none";
            document.getElementById("red").style.color = "#ff8585";

        }

    }, [entries]);



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
                                id="date"
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
                                // value={email}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {/* invoice nmbr */}
                        <Form.Group controlId="formCompany">
                            <Form.Control
                                className='input short'
                                type="text"
                                placeholder="Invoice number"
                                name="invoice"
                                // value={company}
                                onChange={(e) => setInvoiceNmbr(e.target.value)}
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
                                // value={company}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </Form.Group>


                        <h6 className='mt-4 mb-3'>Verifications</h6>

                        {[...Array(accountingsCount)].map((_, index) => (
                            <div key={index} className='accountings' id={`accId${index}`}>
                                <Form.Group controlId={`formCompany${index}`}>
                                    <Form.Control
                                        as="select"
                                        id={`plan${index}`}
                                        className='input select entries'
                                        name={`plan${index}`}
                                        value={entries[index] ? entries[index].plan : ""}
                                        onChange={(e) => handleEntryChange(index, "plan", e.target.value)}
                                        required
                                    >
                                        {planOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId={`formCompany${index}`}>
                                    <Form.Control
                                        className='input entries'
                                        id="debit"
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
                                        className='input entries'
                                        id="credit"
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
                    <h6>Sum debit: {sumDebit}</h6>
                    <h6>Sum kredit: {sumCredit}</h6>
                    <div style={{ display: "flex" }}>
                        <h6 id="red" className='py-3'>Difference: {sumDebit - sumCredit} </h6>
                        <span id="check"><i class="fa-solid fa-check" ></i></span>
                    </div>
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

                {showAlert && (
                    <Alert initialMessage="Accounting has been registered" color="#038815" icon="" />
                )}
                <Chatbot />
            </div>
        </main>
    );
}

export default NewAccounting;
