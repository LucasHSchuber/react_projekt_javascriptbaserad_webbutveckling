import React, { createContext, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap';
import fetchUser from '../../assets/js/fetchUser';
import Chatbot from '../../assets/js/Chatbot';
import { useNavigate } from 'react-router-dom';
import Alert from '../../assets/js/Alert';
import PageAuth from '../../assets/js/pageAuth';


//user settings
function UserSettings() {

    PageAuth();

    //alert
    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        company: "",
        password: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [updatedPassword, setUpdatedPassword] = useState({
        currentpassword: "",
        password: "",
        repeatpassword: ""
    });



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
            }
        };

        fetchData();
    }, []); // The empty dependency array [] ensures that this effect runs only once when the component mounts



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };



    //update user password 
    const updatePassword = async (accountId) => {

        const token = sessionStorage.getItem("token");
        const data = {
            id: accountId,
            currentpassword: updatedPassword.currentpassword,
            password: updatedPassword.password,
            repeatpassword: updatedPassword.repeatpassword,
            token: token,
        }

        console.log(data);

        try {
            const response = await fetch(`http://localhost:5000/users/updatepassword/${accountId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                console.log("User password updated");
                setShowAlert(true);

            } else {
                const responseData = await response.json();
                console.log("Error when updating user password:", responseData.message);
                console.log("Error details:", responseData);
            }

        } catch (error) {
            console.log("error when updating user password:", error);

        }
    }



    //update user data 
    const updateData = async (accountId) => {

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
                setShowAlert(true);


            } else {
                const responseData = await response.json();
                console.log("Error when updating user:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error when updating user:", error);
        }
    };



    //modal opens when user presses delete account button
    const openDeleteModal = () => {
        setShowModal(true);
    }

    //closes the modal if user presses close
    const handleCloseModal = () => {
        setShowModal(false);
    }

    //delete account method
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
                DeleteUserPosts(accountId);
                //send user to main page
                navigate('/');


            } else {
                const responseData = await response.json();
                console.log("Error when deleting user from MongoDB:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error deleting user:", error);
        }
    };


    //delete all posts from users when account is deleted - method
    const DeleteUserPosts = async (accountId) => {

        const id = accountId.toString();

        console.log(id);

        // const data = {
        //     userId: id
        // }

        // console.log(data);

        try {
            const response = await fetch(`http://localhost:5000/accountings/deleteallaccountings/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
                // body: JSON.stringify(data),
            })
            if (response.ok) {
                console.log("Posts deleted from mongodb");

            } else {
                const responseData = await response.json();
                console.log("Error when deleting user posts from MongoDB:", responseData.message);
                console.log("Error details:", responseData.details);
            }

        } catch (error) {
            console.log("error deleting user posts:", error);
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

                    <div className="updatedata">
                        <h5>Update information</h5>
                        <Form>
                            <Form.Group controlId="formName" className="short">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="short">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCompany" className="short">
                                <Form.Label>Company name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Company name"
                                    name="company"
                                    value={userData.company}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Button className='button my-2' onClick={event => updateData(userData.id)}>
                                Update information
                            </Button>
                        </Form>
                    </div>



                    <div className="changepassword mb-5 mt-4">
                        <h5>Change password</h5>
                        <Form>
                            <Form.Group controlId="" className="short">
                                <Form.Label>Current password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    name="currentpassword"
                                    onChange={(e) => setUpdatedPassword({ ...updatedPassword, currentpassword: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="" className="short">
                                <Form.Label>New password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    name="password"
                                    onChange={(e) => setUpdatedPassword({ ...updatedPassword, password: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="" className="short">
                                <Form.Label>Repeat new password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder=""
                                    name="repeatpassword"
                                    onChange={(e) => setUpdatedPassword({ ...updatedPassword, repeatpassword: e.target.value })}
                                />
                            </Form.Group>

                            <Button className='button my-2' onClick={event => updatePassword(userData.id)}>
                                Change Password
                            </Button>
                        </Form>
                    </div>

                    <hr style={{ backgroundColor: "white" }}></hr>

                    <div className='deleteaccountwrapper'>
                        <h5 className='mt-3 mb-3'>Do you want to delete your account?</h5>
                        <Button className='delete-account-button' onClick={openDeleteModal}>
                            Delete Account
                        </Button>
                    </div>


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
                                Delete account
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                {showAlert && (
                    <Alert initialMessage="Data has been updated" color="#038815" icon="" />
                )}

                <Chatbot />
            </div>
        </main >
    );
}

export default UserSettings;
