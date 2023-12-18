import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Alert from '../../assets/js/Alert';
import { useNavigate } from 'react-router-dom';

function CreateUser() {

    const navigate = useNavigate();
    //alert
    const [showAlert, setShowAlert] = useState(false);


    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [regdate, setRegdate] = useState('');
    const [password, setPassword] = useState('');
    const [verifypassword, setVerifyPassword] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        getLastId();
    }, []); // Fetch the last ID when the component mounts


    const createUser = async (e) => {
        // e.preventDefault(); // Prevents the default form submission

        const regdate = new Date().toISOString();

        const idset = id;

        const data = {
            id: idset,
            name: name,
            email: email,
            password: password,
            verifypassword: verifypassword,
            company: company,
            regdate: regdate
        }

        if (name === "") {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("name").style.borderColor = "";
            document.getElementById("name").style.backgroundColor = "";
        }
        if (email === "") {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("email").style.borderColor = "";
            document.getElementById("email").style.backgroundColor = "";
        }
        if (company === "") {
            document.getElementById("company").style.borderColor = "red";
            document.getElementById("company").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("company").style.borderColor = "";
            document.getElementById("company").style.backgroundColor = "";
        }
        if (password === "") {
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("password").style.borderColor = "";
            document.getElementById("password").style.backgroundColor = "";
        }
        if (verifypassword === "") {
            document.getElementById("verifypassword").style.borderColor = "red";
            document.getElementById("verifypassword").style.backgroundColor = "#ffccc4";
        } else {
            document.getElementById("verifypassword").style.borderColor = "";
            document.getElementById("verifypassword").style.backgroundColor = "";
        }


        try {
            const response = await fetch("http://localhost:5000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {

                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);

                // Handle specific error scenarios
                if (errorData.errors) {
                    // Handle validation errors
                    console.error('Validation errors:', errorData.errors);

                    setValidationErrors(errorData.errors);

                } else if (errorData.message === 'Email address is already in use') {
                    // Handle duplicate email error
                    console.error('Email address is already in use');
                }

            } else {
                console.log("Data stored in mongodb");
                setShowAlert(true);
            }

        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    }

    //gettign the last id from users collection in mongodb and adding 1 to new user
    const getLastId = async (e) => {

        // Fetch users to find the last ID
        try {
            const response = await axios.get('http://localhost:5000/users');
            const users = response.data;
            // Find the last ID
            const lastId = users.length > 0 ? users[users.length - 1].id : 0;
            const newId = lastId + 1;
            setId(newId);

        } catch (error) {
            console.error('Error creating user:', error);
        }
    }


    return (
        <div className="">
            <div className="createuserwrapper">
                <h2>Create User</h2>
                <Form className='createuserform'>

                    <div>
                        <ul className="error">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Name */}
                    <Form.Group controlId="formName">
                        <Form.Control
                            className='input'
                            id="name"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            className='input'
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Company Name */}
                    <Form.Group controlId="formCompany">
                        <Form.Control
                            className='input'
                            id="company"
                            type="text"
                            placeholder="Company name"
                            name="companyName"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="formPassword">
                        <Form.Control
                            className='input'
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Verify password */}
                    <Form.Group controlId="formVerifyPassword">
                        <Form.Control
                            className='input'
                            id="verifypassword"
                            type="password"
                            placeholder="Verify password"
                            name="verifypassword"
                            value={verifypassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                        />
                    </Form.Group>


                </Form>
                <h2 className='mt-5'>Choose plan</h2>

            </div>

            <div className='createplanwrapper mt-5'>

                <section className='plans'>

                    <article className=''>
                        <h3>Demo</h3>
                        <p><span>0 SEK / year</span></p>
                        <div className='my-4'>
                            <p><i class="fa-solid fa-xs fa-circle"></i> 50 accoutings/year</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> 50 AI support questions</p>
                        </div>

                    </article>
                    <article className='disabled-plan'>
                        <h3>Light</h3>
                        <p><span>999 SEK / year</span></p>
                        <div className='my-4'>
                            <p><i class="fa-solid fa-xs fa-circle"></i> 200 accoutings/year</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Create invoice tool</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> 200 AI support questions</p>
                        </div>

                    </article>
                    <article className='disabled-plan'>
                        <h3>Unlimited</h3>
                        <p><span>1999 SEK / year</span></p>
                        <div className='my-4'>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Unlimited accoutings/year</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Create invoice tool</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-xs fa-circle"></i> Unlimited AI support questions</p>
                        </div>

                    </article>

                </section>
                <div className='createuserwrapper'>

                    <Button
                        className="button"
                        variant="primary"
                        type="button"
                        onClick={createUser}
                    >
                        Create
                    </Button>
                    <li className='py-3'>Already have an account? Sign in here!</li>

                </div>
            </div>
            {showAlert && (
                <Alert initialMessage="Account has been created" color="#038815" icon="" />
            )}
        </div>
    );
}

export default CreateUser;
