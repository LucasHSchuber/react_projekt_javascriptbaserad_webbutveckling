import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap';
import fetchUser from '../../assets/js/fetchUser';

function UserSettings() {

    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        company: "",
        password: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");



    // useEffect hook to run fetchUser when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();

                setUserData({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    company: userData.company,
                    password: '',
                });

            } catch (error) {
                console.error("Error in fetchData:", error.message);
                // Handle error as needed
            }
        };

        fetchData();
    }, []); // The empty dependency array [] ensures that this effect runs only once when the component mounts



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };



    const handleUpdate = async (accountId) => {

        const token = sessionStorage.getItem("token");

        const data = {
            id: accountId,
            name: userData.name,
            company: userData.company,
            email: userData.email,
        }

        console.log(userData);
        console.log(accountId);
        console.log(data);

        try {
            const response = await fetch(`http://localhost:5000/users/${accountId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                console.log("User updated");

            } else {
                const responseData = await response.json();
                console.log("Error when updating user:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error when updating user:", error);
        }
    };



    const openDeleteModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleDeleteAccount = async (accountId) => {

        const token = sessionStorage.getItem("token");
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");

        if (!isConfirmed) {
            return;
        }

        const data = {
            id: accountId,
            password: deletePassword
        }

        try {
            const response = await fetch(`http://localhost:5000/users/deleteuser`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                console.log("User deleted from mongodb");

                const token = sessionStorage.getItem('token');
                const user = sessionStorage.getItem('userid');
                console.log(token + " has been removed from session storage");
                console.log(user + " has been removed from session storage");
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userid');

                handleCloseModal();


            } else {
                const responseData = await response.json();
                console.log("Error when deleting user from MongoDB:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error deleting user:", error);
        }
    };



    return (
        <main className='py-5'>

            <div className='usersettingswrapper'>
                <h2 className='pb-3'>User settings </h2>

                <div className='usersettings'>
                    <div className="circle">
                        {userData.name.substring(0, 1).toUpperCase()}
                    </div>
                    <Form>
                        <Form.Group controlId="formName" className="short">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="short">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCompany" className="short">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your company name"
                                name="company"
                                value={userData.company}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={event => handleUpdate(userData.id)}>
                            Update
                        </Button>
                    </Form>

                    <div className="changepassword my-5">
                        <Form>
                            <Form.Group controlId="formName" className="short">
                                <Form.Label>Password</Form.Label>
                                <Form.Control

                                    type="password"
                                    placeholder=""
                                    name="password"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="short">
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    name="repaeatpassword"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Button variant="primary">
                                Change Password
                            </Button>
                        </Form>
                    </div>

                    <hr></hr>

                    <Button variant="danger" onClick={openDeleteModal}>
                        Delete Account
                    </Button>


                </div>







                <div>
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        {/* <Modal.Header>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
                        <Modal.Body>
                            <Form.Group controlId="formCompanyName">
                                <Form.Label>Enter password to delete account</Form.Label>
                                <Form.Control
                                    className='input short'
                                    type="password"
                                    placeholder=""
                                    name="password"
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id='modal-close-button' variant="primary" onClick={handleCloseModal}>
                                Close
                            </Button>

                            <Button id='' variant="danger" onClick={event => handleDeleteAccount(userData.id)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </main >
    );
}

export default UserSettings;