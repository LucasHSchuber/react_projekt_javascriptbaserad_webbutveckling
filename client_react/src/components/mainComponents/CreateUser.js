import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function CreateUser() {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [regdate, setRegdate] = useState('');

    const createUser = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        getLastId();
        getRegdate();

        const data = {
            id: id,
            name: name,
            email: email,
            hashed_password: password,
            company: company,
            regdate: regdate
        }


        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("Data stored in mongodb");



            } else {
                console.log("Error when storing data in mongodb:", response.status, response.statusText);
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
            console.log(users);
            // Find the last ID
            const lastId = users.length > 0 ? users[users.length - 1].id : 0;
            const newId = lastId + 1;
            setId(newId);

        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    //setting regdate on stored user
    const getRegdate = (e) => {

        const regdate = new Date();
        setRegdate(regdate);
    }


    return (
        <div className="">

            <div className="createuserwrapper">
                <h2>Create User</h2>
                <Form className='createuserform'>
                    {/* Name */}
                    <Form.Group controlId="formName">
                        <Form.Control
                            className='input'
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

                    {/* Company Name */}
                    <Form.Group controlId="formCompany">
                        <Form.Control
                            className='input'
                            type="text"
                            placeholder="Company name"
                            name="companyName"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
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
                            <p><i class="fa-solid fa-circle"></i>100 accoutings/year</p>
                            <p><i class="fa-solid fa-circle"></i>Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-circle"></i>100 AI support questions</p>
                        </div>

                    </article>
                    <article className='disabled-plan'>
                        <h3>Light</h3>
                        <p><span>999 SEK / year</span></p>
                        <div className='my-4'>
                            <p><i class="fa-solid fa-circle"></i>100 accoutings/year</p>
                            <p><i class="fa-solid fa-circle"></i>Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-circle"></i>100 AI support questions</p>
                        </div>

                    </article>
                    <article className='disabled-plan'>
                        <h3>Unlimited</h3>
                        <p><span>1999 SEK / year</span></p>
                        <div className='my-4'>
                            <p><i class="fa-solid fa-circle"></i>100 accoutings/year</p>
                            <p><i class="fa-solid fa-circle"></i>Free balance- and result sheets</p>
                            <p><i class="fa-solid fa-circle"></i>100 AI support questions</p>
                        </div>

                    </article>

                </section>
                <div className='createuserwrapper'>

                    <Button
                        className="button mt-4"
                        variant="primary"
                        type="button"
                        onClick={createUser}
                    >
                        Create
                    </Button>
                    <li className='py-5'>Already have an account? Sign in here!</li>

                </div>
            </div>


        </div>
    );
}

export default CreateUser;
