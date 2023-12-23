import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

//footer
function Footer() {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const isLoggedIn = sessionStorage.getItem('token') !== null;

    return (
        <footer >

            <div className='footer'>
                <div className='d-flex justify-content-center'>
                    <i class="fa-brands fa-2x fa-facebook"></i>
                    <i class="mx-5 fa-brands fa-2x fa-square-instagram"></i>
                    <i class="fa-brands fa-2x fa-twitter"></i>
                </div>

                <div className='footer-nav d-flex justify-content-center my-3'>
                    <Navbar>
                        <Nav className={`d-flex flex-row menulinks ${isMenuVisible ? 'menu-visible' : ''}`}>

                            {isLoggedIn ? (
                                <>

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
                                    <Nav.Link as={Link} to="/usersettings" className='menu-link'>
                                        User settings
                                    </Nav.Link>

                                </>
                            ) : (
                                <>

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
