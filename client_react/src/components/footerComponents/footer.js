import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function Footer() {

    const [isMenuVisible, setMenuVisible] = useState(false);
    // const [isVisible, setIsVisible] = useState(false);
    // const [isVisible2, setIsVisible2] = useState(false);

    const isLoggedIn = sessionStorage.getItem('token') !== null;

    return (
        <footer >

            <div className='footer'>
                <div className='d-flex justify-content-center'>
                    <i class="fa-brands fa-2x fa-facebook"></i>
                    <i class="mx-5 fa-brands fa-2x fa-square-instagram"></i>
                    <i class="fa-brands fa-2x fa-twitter"></i>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    <Navbar expand="lg">
                        <Navbar.Toggle aria-controls="navbarSupportedContent" />
                        <Navbar.Collapse id="navbarSupportedContent">
                            <Nav className={`d-flex flex-row menulinks ${isMenuVisible ? 'menu-visible' : ''}`}>
                                {/* Conditionally render other links based on authentication status */}
                                {isLoggedIn ? (
                                    <>
                                        {/* Links to show when the user is logged in */}
                                        <Nav.Link as={Link} to="/home" className='menu-link '>
                                            Home
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/newaccounting" className='menu-link'>
                                            New Accounting
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/allaccountings" className='menu-link '>
                                            All Accounting
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/balancesheets" className='menu-link'>
                                            Balance Sheet
                                        </Nav.Link>

                                    </>
                                ) : (
                                    <>
                                        {/* Links to show when the user is not logged in */}
                                        <Nav.Link as={Link} to="/" className='menu-link'>
                                            Start
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/createuser" className='menu-link '>
                                            Sign up
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/login" className='menu-link '>
                                            Log in
                                        </Nav.Link>
                                    </>
                                )}
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className='d-flex justify-content-center' style={{ fontSize: "0.9em" }}>
                    <p>@2023 AIAS - All Rights Reserved</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
