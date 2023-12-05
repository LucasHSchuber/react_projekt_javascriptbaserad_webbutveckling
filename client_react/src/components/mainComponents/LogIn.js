import React from 'react';
import { Form, Button } from 'react-bootstrap';

function LogIn() {
    return (
        <header className="">

            <div className="signinuserwrapper">
                <h2>Sign In</h2>
                <Form className='signinuserform'>

                    {/* Email */}
                    <Form.Group controlId="formEmail">
                        {/* <Form.Label>Email:</Form.Label> */}
                        <Form.Control className='input' type="email" placeholder="Email" required />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="formPassword">
                        {/* <Form.Label>Password:</Form.Label> */}
                        <Form.Control className='input' type="password" placeholder="Password" required />
                    </Form.Group>

                    <Button className="button mt-4" variant="primary" type="submit">
                        Sign In
                    </Button>

                    <li className=''>Create a new account? Click here!</li>

                </Form>

            </div>

        </header>
    );
}

export default LogIn;
