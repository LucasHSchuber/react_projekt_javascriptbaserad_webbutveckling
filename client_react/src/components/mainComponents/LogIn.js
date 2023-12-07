
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';


function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        const data = {
            email: email,
            password: password
        }

        try {
            const response = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("user signed in");

                // Store the token in sessionStorage
                const token = responseData.token;
                const id = responseData.id;
                console.log(responseData.token);
                console.log(responseData.id);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userid', id);

                //send user to main page


            } else {
                const responseData = await response.json();
                console.log("Error when signin in user:", responseData.message);
                console.log("Error when signin in user:", response.status, response.statusText, response.message);
            }

        } catch (error) {
            console.log("error loggin in user: ", error.message);

        }

    }



    return (
        <header className="">

            <div className="signinuserwrapper">
                <h2>Sign In</h2>
                <Form className='signinuserform'>

                    {/* Email */}
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            className='input'
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="formPassword">
                        <Form.Control
                            className='input'
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button
                        className="button mt-4"
                        variant="primary"
                        type="button"
                        onClick={loginUser}
                    >
                        Sign in
                    </Button>

                    <li className=''>Create a new account? Click here!</li>

                </Form>

            </div>

        </header>
    );
}

export default LogIn;
