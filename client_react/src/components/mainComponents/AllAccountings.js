// typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
import axios from 'axios';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Chatbot from '../../assets/js/Chatbot';
import Alert from '../../assets/js/Alert';
import { useNavigate } from 'react-router-dom';
import PageAuth from '../../assets/js/pageAuth';




function AlAccountings() {

    // const navigate = useNavigate();
    // //page display validation
    // const token_check_auth = sessionStorage.getItem("token");
    // if (!token_check_auth) {
    //     navigate("/login");
    // }
    PageAuth();

    //alert
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);

    //screen size
    const isSmallScreen = window.innerWidth < 992;

    const [accountings, setAccountings] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [dateOrder, setDateOrder] = useState("asc");
    const [searchResponse, setSearchResponse] = useState("");
    const [selectedAcc, setSelectedAcc] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [userData, setUserData] = useState({
        invoiceNmbr: "",
        comment: "",
        companyName: "",
    });




    //load when mounted
    useEffect(() => {
        getAllAccountings();
    }, [dateOrder]);

    //get all accountings and store it in accountings useState (setAccountings)
    const getAllAccountings = async () => {

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userid');
        console.log(userId);

        try {
            const response = await fetch(`http://localhost:5000/accountings/acc?userId=${userId}&order=${dateOrder}`, {
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
    };



    //When a field is changed in the edit-module
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };



    //sorting date 
    const handleDateOrder = () => {
        setDateOrder((prevDateOrder) => (prevDateOrder === "asc" ? "desc" : "asc"));
    }


    useEffect(() => {

        const fetchSearchResults = async () => {

            const userId = sessionStorage.getItem('userid');

            try {
                const response = await axios.get(`http://localhost:5000/accountings/search?userId=${userId}&searchString=${searchString}&order=${dateOrder}`);
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

    }, [searchString, dateOrder])



    //when clicking edit button
    const editAccounting = async (accounting) => {

        setSelectedAcc(accounting); //set the plan. credit, debit to use in modal
        setUserData({
            invoiceNmbr: accounting.invoiceNmbr,
            comment: accounting.comment,
            companyName: accounting.companyName,
        });

        setShowModal(true);
    };

    //closes modal
    const handleCloseModal = () => {
        setShowModal(false);
    }


    // when save button in module is clicked - updating db
    const saveAccounting = async (accountId) => {

        const token = sessionStorage.getItem("token");
        const data = {
            companyName: userData.companyName,
            comment: userData.comment,
            invoiceNmbr: userData.invoiceNmbr
        }

        try {
            const response = await fetch(`http://localhost:5000/accountings/${accountId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                console.log("Data updated in mongodb");
                getAllAccountings();
                handleCloseModal(false);
                setShowAlert2(true);

            } else {
                const responseData = await response.json();
                console.log("Error when updating data in MongoDB:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("Error updating accounting:", error.message);
        }
    }




    //deleting a account
    const deleteAccounting = async (accountId) => {

        const token = sessionStorage.getItem("token");
        const isConfirmed = window.confirm("Are you sure you want to delete this accounting post?");

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/accountings/${accountId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                console.log("Data deleted from mongodb");
                getAllAccountings();
                setShowAlert(true);

            } else {
                const responseData = await response.json();
                console.log("Error when deleting data from MongoDB:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error deleting accounting:", error);
        }
    }



    return (
        <main className='py-5'>

            <div className='allaccountingswrapper'>
                <h2 className='pb-5'>All accountings </h2>



                <div className='allaccountingstable'>

                    <nav className="mb-4">
                        <form className="form-inline">
                            <input
                                className="form-control input mr-sm-2"
                                type="search"
                                placeholder="Search: company, comment, invoice number"
                                aria-label="Search"
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            />

                        </form>
                    </nav>


                    <table>
                        <thead>
                            <tr>
                                <th>Date<Button
                                    id="filter-date-button"
                                    className='ml-2'
                                    onClick={handleDateOrder}
                                >
                                    <i class="fa-solid fa-sm fa-arrow-down"></i>
                                </Button>
                                </th>
                                <th>{isSmallScreen ? "Inv.nmbr" : "Invoice number"}</th>
                                <th>{isSmallScreen ? "Comp" : "Company"}</th>
                                <th>{isSmallScreen ? "Com" : "Comment"}</th>
                                <th>{isSmallScreen ? "Ver" : "Verifications"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResponse.length > 0 ? searchResponse : accountings).map(accounting => (
                                <React.Fragment key={accounting.id}>
                                    {accounting.entries.map((entry, index, array) => (
                                        <tr key={entry._id} style={index === array.length - 1 ? { borderBottom: '1px solid #ddd', marginBottom: '20px' } : {}}>

                                            {index === 0 && (
                                                <>
                                                    <td>{accounting.date.substring(0, 10)}</td>
                                                    <td>{accounting.invoiceNmbr}</td>
                                                    <td>
                                                        {accounting.companyName.length > 15
                                                            ? accounting.companyName.substring(0, 15) + "..."
                                                            : accounting.companyName}
                                                    </td>
                                                    <td>
                                                        {accounting.comment.length > 15
                                                            ? accounting.comment.substring(0, 15) + "..."
                                                            : accounting.comment}
                                                    </td>
                                                    <td>{array.length}</td>
                                                </>
                                            )}

                                            {index === 0 && (
                                                <td>
                                                    <Button id="edit-button" onClick={() => editAccounting(accounting)}>{isSmallScreen ? <i class="fa-solid fa-sm fa-pen-to-square"></i> : "Edit"}</Button>
                                                </td>
                                            )}
                                            {index === 0 && (
                                                <td>
                                                    <Button id="delete-button" onClick={event => deleteAccounting(accounting.id)}>{isSmallScreen ? <i class="fa-solid fa-sm fa-trash-can"></i> : "Delete"}</Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {selectedAcc && (
                        <div className='modal'>
                            <Modal show={showModal} onHide={handleCloseModal} centered>
                                <Modal.Header>
                                    <Modal.Title>{selectedAcc.date.substring(0, 10)}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>


                                    <Form.Group controlId="formInvoiceNmbr" className='my-3'>
                                        <Form.Label>Invoice number:</Form.Label>
                                        <Form.Control
                                            className='input short'
                                            type="text"
                                            placeholder=""
                                            name="invoiceNmbr"
                                            value={userData.invoiceNmbr}
                                            onChange={handleInputChange}

                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formCompanyName">
                                        <Form.Label>Company:</Form.Label>
                                        <Form.Control
                                            className='input short'
                                            type="text"
                                            placeholder=""
                                            name="companyName"
                                            value={userData.companyName}
                                            onChange={handleInputChange}

                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formComment">
                                        <Form.Label>Comment:</Form.Label>
                                        <Form.Control
                                            className='input short'
                                            type="text"
                                            placeholder=""
                                            name="comment"
                                            value={userData.comment}
                                            onChange={handleInputChange}

                                        />
                                    </Form.Group>


                                    <hr></hr>
                                    {/* <h6>Verifications:</h6> */}

                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Plan</th>
                                                <th>Debit</th>
                                                <th>Credit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedAcc.entries.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.plan}</td>
                                                    <td>{item.debit}</td>
                                                    <td>{item.credit}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button id='modal-close-button' variant="primary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                    <Button id='modal-save-button' variant="primary" onClick={event => saveAccounting(selectedAcc.id)}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )}
                </div>

                {showAlert && (
                    <Alert initialMessage="Accounting has been deleted" color="#B91623" icon="" />
                )}
                {showAlert2 && (
                    <Alert initialMessage="Accounting has been edited" color="#B8A01A" icon="" />
                )}
                <Chatbot />
            </div>
        </main >
    );
}

export default AlAccountings;
